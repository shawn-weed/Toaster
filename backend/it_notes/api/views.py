from rest_framework.viewsets import ModelViewSet
from ..models import Note
from .serializers import NoteSerializer
from rest_framework import filters

class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'issue_title', 'device', 'tech', 'user', 'tech_notes']