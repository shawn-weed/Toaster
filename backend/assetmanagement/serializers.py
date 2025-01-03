from rest_framework import serializers
from .models import CustomAsset

class CustomAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomAsset
        fields = ('category', 'serial_number',)