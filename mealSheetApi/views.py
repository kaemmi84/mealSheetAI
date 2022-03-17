from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import Meal
from .serializers import MealSerializer, RegisterSerilizer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from datetime import date, time, datetime


class MealView(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Meal.objects.filter(owner=self.request.user)
        return queryset

    @action(detail=False, methods=['get'], url_path=r'by_date')
    def get_meal_by_date(self, request, *args):
        request_date = request.GET.get('meal_date')
        meal_date = datetime.strptime(request_date, '%a %b %d %Y')
        meals_by_date = Meal.objects.filter(
            owner=self.request.user,
            mealTimestamp__day=meal_date.day,
            mealTimestamp__month=meal_date.month,
            mealTimestamp__year=meal_date.year
        )
        serializer = self.get_serializer(meals_by_date, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerilizer
    http_method_names = ['post']


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    