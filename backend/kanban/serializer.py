from rest_framework import serializers

from .models import Card, Column

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'title', 'description', 'priority', 'tags', 'date', 'assignees', 'column', 'order']

class ColumnSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = ['id', 'order', 'title', 'cards']