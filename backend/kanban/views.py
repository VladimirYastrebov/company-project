from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from .exceptions import (
    AuthenticationError,
    ConflictError,
    NotFoundError,
    ValidationError,
)
from .models import Column, Card
from .serializer import ColumnSerializer, CardSerializer


@api_view(['GET', 'POST'])
def column_list(request):
    if request.method == 'GET':
        columns = Column.objects.all().order_by('order')
        serializer = ColumnSerializer(columns, many=True)
        return Response(serializer.data)

    serializer = ColumnSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    raise ValidationError(detail=serializer.errors, error_code="column.invalid")


@api_view(['GET', 'PUT', 'DELETE'])
def column_detail(request, column_id):
    try:
        column = Column.objects.get(id=column_id)
    except Column.DoesNotExist:
        raise NotFoundError(detail="Column not found", error_code="column.not_found")

    if request.method == 'GET':
        serializer = ColumnSerializer(column)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ColumnSerializer(column, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        raise ValidationError(detail=serializer.errors, error_code="column.invalid")

    column.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def card_list(request, column_id):
    try:
        Column.objects.get(id=column_id)
    except Column.DoesNotExist:
        raise NotFoundError(detail="Column not found", error_code="column.not_found")

    if request.method == 'GET':
        cards = Card.objects.filter(column_id=column_id).order_by('order')
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    data = request.data.copy()
    data['column'] = column_id
    serializer = CardSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    raise ValidationError(detail=serializer.errors, error_code="card.invalid")


@api_view(['GET', 'PUT', 'DELETE'])
def card_detail(request, card_id):
    try:
        card = Card.objects.get(id=card_id)
    except Card.DoesNotExist:
        raise NotFoundError(detail="Card not found", error_code="card.not_found")

    if request.method == 'GET':
        serializer = CardSerializer(card)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = CardSerializer(card, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        raise ValidationError(detail=serializer.errors, error_code="card.invalid")

    card.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
