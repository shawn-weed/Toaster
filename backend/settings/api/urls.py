from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import LinkViewSet

links_router = DefaultRouter()
links_router.register(r'links', LinkViewSet)