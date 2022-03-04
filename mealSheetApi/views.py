from django.shortcuts import render
from rest_framework import viewsets
from .models import Meal
from .serializers import MealSerializer, RegisterSerilizer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class MealView(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Meal.objects.filter(owner=self.request.user)
        return queryset

class RegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerilizer
    http_method_names = ['post']