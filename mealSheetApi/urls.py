from django.urls import path, include
from rest_framework import routers
from .views import MealView, RegisterView

router = routers.DefaultRouter()
router.register("meals", MealView, basename="MealViewRoute")
router.register("register", RegisterView, basename="RegisterViewRoute")

urlpatterns = [
    path('', include(router.urls)),
]