"""Urls for the team app."""
from django.urls import path

from . import views

urlpatterns = [
    path(r"", views.team_list_view, name="team_list_view"),
]