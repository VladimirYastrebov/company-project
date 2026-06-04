from django.urls import path
from . import views

urlpatterns = [
    path('employee/', views.ReactListView.as_view(), name='employee'),
]
