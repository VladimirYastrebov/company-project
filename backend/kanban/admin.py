from django.contrib import admin
from .models import *

# Register your models here.

class CardInline(admin.TabularInline):
    model = Card
    extra = 1
    fields = ['id', 'title', 'description', 'priority', 'tags', 'date', 'assignees', 'order']
    ordering = ['order']

@admin.register(Column)
class ColumnAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'order']
    list_editable = ['order']
    inlines = [CardInline]

@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'column', 'priority', 'order', 'date']
    list_filter = ['priority']
    search_fields = ['title', 'description']