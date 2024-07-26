from django.db import models
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Voter, Vote, VotingStatus
from .serializers import VoterSerializer, VoteSerializer
from rest_framework.permissions import AllowAny

@api_view(['POST'])
def register_voter(request):
    voter_id = request.data.get('voter_id')
    if Voter.objects.filter(voter_id=voter_id).exists():
        return Response({'message': 'Voter already registered'}, status=status.HTTP_400_BAD_REQUEST)
    voter = Voter(voter_id=voter_id)
    voter.save()
    return Response({'message': 'Voter registered successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def cast_vote(request):
    voter_id = request.data.get('voter_id')
    party = request.data.get('party')
    try:
        voter = Voter.objects.get(voter_id=voter_id)
    except Voter.DoesNotExist:
        return Response({'message': 'Invalid voter'}, status=status.HTTP_400_BAD_REQUEST)
    if voter.has_voted:
        return Response({'message': 'Already voted'}, status=status.HTTP_400_BAD_REQUEST)
    if party not in ['BJP', 'INC', 'AAP']:
        return Response({'message': 'Invalid party'}, status=status.HTTP_400_BAD_REQUEST)
    vote = Vote(voter=voter, party=party)
    voter.has_voted = True
    voter.save()
    vote.save()
    return Response({'message': 'Vote cast successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def results(request):
    status_obj = VotingStatus.objects.first()
    if not status_obj or not status_obj.is_voting_complete:
        return Response({'message': 'Voting is not complete yet.'}, status=status.HTTP_403_FORBIDDEN)
    
    results = Vote.objects.values('party').annotate(count=models.Count('party')).order_by('-count')
    
    # Get the party with the highest votes
    highest_voted_party = results[0] if results else None

    data = {
        'results': results,
        'highest_voted_party': highest_voted_party
    }

    return Response(data)

@api_view(['POST'])
def complete_voting(request):
    status_obj, created = VotingStatus.objects.get_or_create(id=1)
    status_obj.is_voting_complete = True
    status_obj.save()
    return Response({'message': 'Voting has been marked as complete.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def check_voter_status(request):
    voter_id = request.data.get('voter_id')
    try:
        voter = Voter.objects.get(voter_id=voter_id)
        if voter.has_voted:
            return Response({'already_voted': True})
        else:
            return Response({'already_voted': False})
    except Voter.DoesNotExist:
        return Response({'error': 'Voter not found'}, status=status.HTTP_404_NOT_FOUND)
