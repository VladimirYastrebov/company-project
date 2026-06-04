from django.db import models

# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=30)
    salary = models.CharField(max_length=30)
    upping_salary = models.BooleanField()
    id = models.CharField(max_length=30, primary_key=True)