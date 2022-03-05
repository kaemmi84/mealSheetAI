from rest_framework import serializers
from .models import Meal
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class MealSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Meal
        fields = ("id", "description", "owner", "updated", "picture")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

class RegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password", "email")

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"], email=validated_data["email"]
        )

        user.set_password(validated_data["password"])
        user.save()
        
        return user