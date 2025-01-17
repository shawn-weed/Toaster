from django.db import models

# Create your models here.

class Note(models.Model):

    issue_title = models.CharField(max_length=120)
    device = models.CharField(max_length=120, null=True, blank=True)
    date_of_occurance = models.DateField()
    tech = models.CharField(max_length=50, null=True, blank=True)
    user = models.CharField(max_length=50, null=True, blank=True)
    ticket_number = models.CharField(max_length=30, null=True, blank=True)
    tech_notes = models.TextField()

    def __str__(self):
        return self.issue_title