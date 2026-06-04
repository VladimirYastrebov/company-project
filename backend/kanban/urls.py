from django.urls import path
from . import views

urlpatterns = [
    path('columns/', views.column_list, name="column-list"),
    path('columns/<str:column_id>/', views.column_detail, name='column-detail'),
    
    path('columns/<str:column_id>/cards/', views.card_list, name='card-list'),
    path('cards/<str:card_id>/', views.card_detail, name='card-detail'),
]