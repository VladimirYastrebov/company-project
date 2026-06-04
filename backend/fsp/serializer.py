from rest_framework import serializers
from .models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['name', 'salary', 'upping_salary', 'id']