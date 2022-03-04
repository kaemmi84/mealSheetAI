from dataclasses import fields
from rest_framework import serializers
from  .models import Meal

class MealSerializer(serializers.ModelSerializer):

    class Meta:
        model =  Meal
        fields = ("id", "description", "owner", "updated")