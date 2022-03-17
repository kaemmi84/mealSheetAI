from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4
import os


def path_and_rename(instance, filename):
    upload_to = 'photos'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)


class Meal(models.Model):
    description = models.CharField(max_length=2000)
    updated = models.DateTimeField(auto_now_add=True)
    mealTimestamp = models.DateTimeField()
    meals = [
        ('breakfast', 'breakfast'),
        ('lunch', 'lunch'),
        ('coffee', 'coffee'),
        ('dinner', 'dinner'),
        ('snack', 'snack'),
    ]
    mealTime = models.CharField(max_length=10, choices=meals, default='lunch')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    picture = models.ImageField(
        upload_to=path_and_rename,
        null=True,
        blank=True,
        editable=True
        )


class Unit(models.Model):
    name: models.CharField(max_length=50)


class Ingredient(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    size = models.DecimalField(default=0.0, max_digits=20, decimal_places=2)
    unit  = models.OneToOneField(Unit, on_delete=models.CASCADE, primary_key=True)
    kcal = models.DecimalField(default=0.0, max_digits=20, decimal_places=2)
    carbs = models.DecimalField(default=0.0, max_digits=20, decimal_places=2)
    fat = models.DecimalField(default=0.0, max_digits=20, decimal_places=2)
    proteins = models.DecimalField(default=0.0, max_digits=20, decimal_places=2)
