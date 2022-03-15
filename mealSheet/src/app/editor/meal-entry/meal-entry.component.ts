import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faBacon, faCheese, faCoffee, faCookieBite, faFish} from '@fortawesome/free-solid-svg-icons';
import {MealTime} from "../../helpers/meal-time";

export interface Ingredient {
  name: string;
  size?: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

@Component({
  selector: 'app-meal-entry',
  templateUrl: './meal-entry.component.html',
  styleUrls: ['./meal-entry.component.scss']
})
export class MealEntryComponent implements OnInit, OnChanges {
  @Input() mealTime: MealTime | undefined;

  ingredients: Ingredient[] = [
    {
      name: 'Egg',
      calories: 200,
      carbs: 20,
      fat: 50,
      protein: 60,
    },
    {
      name: 'Toast',
      calories: 200,
      carbs: 20,
      fat: 50,
      protein: 60,
    },
    {
      name: 'Holondaise',
      calories: 200,
      carbs: 20,
      fat: 50,
      protein: 60,
    },
  ];
  displayedColumns: string[] = ['name', 'calories', 'carbs', 'fat', 'protein'];

  icon = faCoffee;

  timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
  mealText: string = '';
  expanded: any;
  ingriedens: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['mealTime']) {
      switch (this.mealTime) {
        case MealTime.breakfast:
          this.icon = faBacon
          this.mealText = "What did you eat for breakfast?";
          break;
        case MealTime.lunch:
          this.mealText = "What did you eat for lunch?";
          this.icon = faFish;
          break;
        case MealTime.coffee:
          this.mealText = "What did you eat for coffee?";
          this.icon = faCoffee;
          break;
        case MealTime.dinner:
          this.mealText = "What did you eat for dinner?";
          this.icon = faCheese
          break;
        case MealTime.snack:
          this.mealText = "What did you eat for snack?";
          this.icon = faCookieBite
          break;
      }
    }
  }

  getTotalCalories() {
    return this.ingredients.map(i => i.calories).reduce((acc: number, value: number) => acc + value, 0);
  }

  getTotalCarbs() {
    return this.ingredients.map(i => i.carbs).reduce((acc: number, value: number) => acc + value, 0);
  }

  getTotalFat() {
    return this.ingredients.map(i => i.fat).reduce((acc: number, value: number) => acc + value, 0);
  }

  getTotalProtein() {
    return this.ingredients.map(i => i.protein).reduce((acc: number, value: number) => acc + value, 0);
  }

  public static createMailForm(): FormGroup {
    const fb: FormBuilder = new FormBuilder();
    return fb.group({
      meal: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  toggleDetails() {
    this.expanded = !this.expanded;
  }
}
