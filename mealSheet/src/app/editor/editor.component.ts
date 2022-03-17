import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MealService} from "../services/meal.service";
import {Meal} from "../interfaces/meal";
import {MealTime} from "../helpers/meal-time";
import {map} from "rxjs";


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  meals: Meal[] = [];
  public mealDateForm: FormGroup = this.fb.group({
    mealDate: [new Date()]
  });

  constructor(
    private fb: FormBuilder,
    private mealService: MealService
  ) {
    this.GetMealsOfDay(new Date())
    this.mealDateForm.valueChanges.subscribe(
      (value) => {
        this.GetMealsOfDay(value.mealDate);
      }
    )
  }

  private GetMealsOfDay(date: Date) {
    const now = this.mealDateForm.get('mealDate')?.value;
    now.setHours(9);
    const breakfastTime = now;
    now.setHours(12);
    const lunchTime = now;
    now.setHours(15);
    const coffeeTime = now;
    now.setHours(18);
    const dinnerTime = now;

    const defaultBreakfast: Meal = {mealTime: 'breakfast', mealTimestamp: breakfastTime};
    const defaultLunch: Meal = {mealTime: 'lunch', mealTimestamp: lunchTime};
    const defaultCoffee: Meal = {mealTime: 'coffee', mealTimestamp: coffeeTime};
    const defaultDinner: Meal = {mealTime: 'dinner', mealTimestamp: dinnerTime};


    this.mealService.getMealsByDate(date)
      .subscribe((meals: Meal[]) => {
        let currentMeals: Meal[] = meals;
        const mealTimes = meals.map((m: Meal) => m.mealTime);
        console.log('test', mealTimes)
        if(mealTimes.indexOf('breakfast') === -1) {
          currentMeals.push(defaultBreakfast);
        }
        if(mealTimes.indexOf('lunch') === -1) {
          currentMeals.push(defaultLunch);
        }
        if(mealTimes.indexOf('coffee') === -1) {
          currentMeals.push(defaultCoffee);
        }
        if(mealTimes.indexOf('dinner') === -1) {
          currentMeals.push(defaultDinner);
        }
        console.log('meals', currentMeals);
        this.meals = currentMeals.sort((a: Meal, b: Meal) =>
          new Date(a.mealTimestamp).getTime() - new Date(b.mealTimestamp).getTime()
        );
      });
  }

  ngOnInit(): void {

  }

  // addMeal() {
  //   const meal = this.fb.group({
  //     meal: ['', Validators.required],
  //     date: [new Date(), Validators.required]
  //   });
  //
  //   this.meals.push(meal);
  // }

}
