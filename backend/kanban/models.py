from django.db import models
import uuid

# Create your models here.

class Column(models.Model):
    id = models.CharField(primary_key=True, max_length=40, default=uuid.uuid4, editable=True)
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=100)

class Card(models.Model):
    PRIORITY_LOW = "low"
    PRIORITY_MEDIUM = "medium"
    PRIORITY_HIGH = "high"

    PRIORITY_CHOICES = [
        (PRIORITY_LOW, "Low"),
        (PRIORITY_MEDIUM, "Medium"),
        (PRIORITY_HIGH, "High"),
    ]

    id = models.CharField(primary_key=True, max_length=40, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=40)
    description = models.TextField(default='', blank=True)
    priority = models.CharField(
        max_length=6,
        choices=PRIORITY_CHOICES,
        default=PRIORITY_LOW,
    )
    tags = models.CharField(max_length=50, blank=True, default='')
    date = models.DateField()
    assignees = models.CharField(max_length=50, blank=True, default='')
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name="cards")
    order = models.IntegerField(default=0)