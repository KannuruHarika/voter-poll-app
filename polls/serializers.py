from rest_framework import serializers
from .models import Voter, Vote,VotingStatus

class VoterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voter
        fields = ['voter_id', 'has_voted']

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['voter', 'party']

class VotingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = VotingStatus
        fields = ['is_voting_complete']
