from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import LinkViewSet

note_router = DefaultRouter()
note_router.register(r'links', LinkViewSet)