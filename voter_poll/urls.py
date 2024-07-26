from django.contrib import admin
from django.urls import path
from polls import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', views.register_voter, name='register_voter'),
    path('api/vote/', views.cast_vote, name='cast_vote'),
    path('api/results/', views.results, name='results'),
    path('api/complete_voting/', views.complete_voting, name='complete_voting'),
    path('api/check_voter_status/', views.check_voter_status, name='check_voter_status'),
]