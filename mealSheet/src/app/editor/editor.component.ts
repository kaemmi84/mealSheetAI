import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MealTime} from "../helpers/meal-time";

export interface Meal {
  mealTime: MealTime;
  meal?: string;
  time?: Date
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  meals: Meal[] = [
    {mealTime: MealTime.breakfast},
    {mealTime: MealTime.lunch},
    {mealTime: MealTime.coffee},
    {mealTime: MealTime.dinner},
  ];
  public mealDateForm: FormGroup = this.fb.group({
    mealDate: [new Date()]
  });

  constructor(private fb: FormBuilder) { }

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
