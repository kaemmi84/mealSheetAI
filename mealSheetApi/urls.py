from django.urls import path, include
from rest_framework import routers
from .views import MealView

router = routers.DefaultRouter()
router.register("meals", MealView, basename="MealViewRoute")

urlpatterns = [
    path('', include(router.urls)),
]