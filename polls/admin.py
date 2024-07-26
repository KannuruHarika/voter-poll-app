from django.contrib import admin
from .models import Voter, Vote, VotingStatus

admin.site.register(Voter)
admin.site.register(Vote)

@admin.register(VotingStatus)
class VotingStatusAdmin(admin.ModelAdmin):
    list_display = ['is_voting_complete']
    actions = ['mark_voting_complete']

    def mark_voting_complete(self, request, queryset):
        queryset.update(is_voting_complete=True)
        self.message_user(request, "Selected voting status has been marked as complete.")
    mark_voting_complete.short_description = "Mark selected voting status as complete"
