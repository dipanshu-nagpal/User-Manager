from django.db import models
from django.contrib.auth.models import User

class User(models.Model):
    userId = models.IntegerField()
    title = models.CharField(max_length=150)
    body = models.CharField(max_length=500)
