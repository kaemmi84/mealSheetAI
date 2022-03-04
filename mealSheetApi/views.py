from django.shortcuts import render
from rest_framework import viewsets
from .models import Meal
from .serializers import MealSerializer

class MealView(viewsets.ModelViewSet):
    serializer_class = MealSerializer

    def get_queryset(self):
        queryset = Meal.objects.all()
        return queryset
