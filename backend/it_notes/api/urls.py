from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet

note_router = DefaultRouter()
note_router.register(r'notes', NoteViewSet)