from django.db import models
from django.core.exceptions import ValidationError

class Voter(models.Model):
    voter_id = models.CharField(max_length=50, unique=True)
    has_voted = models.BooleanField(default=False)

class Vote(models.Model):
    PARTIES = [
        ('BJP', 'Bharatiya Janata Party'),
        ('INC', 'Indian National Congress'),
        ('AAP', 'Aam Aadmi Party'),
    ]
    voter = models.ForeignKey(Voter, on_delete=models.CASCADE)
    party = models.CharField(max_length=3, choices=PARTIES)

class VotingStatus(models.Model):
    is_voting_complete = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk and VotingStatus.objects.exists():
            raise ValidationError('There can be only one VotingStatus instance')
        return super(VotingStatus, self).save(*args, **kwargs)
