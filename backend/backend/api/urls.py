from rest_framework.routers import DefaultRouter
from it_notes.api.urls import note_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(note_router.registry)

urlpatterns = [
    path('', include(router.urls))
]