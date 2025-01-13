from rest_framework.viewsets import ModelViewSet
from ..models import Link
from .serializers import LinkSerializer
from rest_framework import filters

class LinkViewSet(ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id']