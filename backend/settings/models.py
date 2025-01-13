from django.db import models

class Link(models.Model):

    title = models.CharField(max_length=120)
    url = models.CharField(max_length=120)
    desc = models.TextField()

    def __str__(self):
        return self.title, self.url