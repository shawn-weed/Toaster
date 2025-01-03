from django.db import models

# Create your models here.

class CustomAsset(models.Model):

    asset_type = models.CharField(max_length=120)
    identifying_number = models.CharField(max_length=40)
    custom_fields = models.JSONField()
    # status = models.CharField(max_length=30)
    # asset_id = models.CharField(max_length=30)
    # location = models.CharField(max_length=30)
    # model = models.CharField(max_length=120)

    def __str__(self):
        return [self.asset_type]