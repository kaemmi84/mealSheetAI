import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faBacon, faCheese, faCoffee, faCookieBite, faFish} from '@fortawesome/free-solid-svg-icons';
import {MealTime} from "../../helpers/meal-time";
import {MealService} from "../../services/meal.service";
import {Meal} from "../../interfaces/meal";
import {debounce, timer} from "rxjs";

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
  @Input() chosenDate: Date = new Date();
  @Input() id: number | undefined;
  @Input() description: string | undefined;
  @Input() mealTime: 'breakfast' | 'lunch' | 'coffee'| 'dinner' | 'snack' | undefined;

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

  mealForm: FormGroup = this.fb.group({
    description: ['']
  })

  icon = faCoffee;

  timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
  mealText: string = '';
  expanded: any;
  ingriedens: any;

  constructor(
    private fb: FormBuilder,
    private mealService: MealService
  ) {
  }

  ngOnInit(): void {
    this.mealForm.get('description')?.valueChanges.subscribe(
      description => {
        const currentMealTimeStamp = this.chosenDate;
        switch (this.mealTime) {
          case 'breakfast':
            currentMealTimeStamp.setHours(9);
            break;
          case 'lunch':
            currentMealTimeStamp.setHours(12);
            break;
          case 'coffee':
            currentMealTimeStamp.setHours(15);
            break;
          case 'dinner':
            currentMealTimeStamp.setHours(18);
            break;
        }

        const newMeal = <Meal>{
          description: description,
          mealTime: this.mealTime,
          mealTimestamp: currentMealTimeStamp
        };

        if(this.id) {
          this.mealService.putMeal(this.id, newMeal)
            .pipe(debounce(() => timer(300)))
            .subscribe(
              (meal: Meal) => this.id = meal.id,
              error => console.log('error on post meal', error)
            );
        } else {
          this.mealService.postMeal(newMeal)
            .pipe(debounce(() => timer(300)))
            .subscribe(
              (meal: Meal) => this.id = meal.id,
              error => console.log('error on post meal', error)
            );
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['mealTime']) {
      switch (this.mealTime) {
        case 'breakfast':
          this.icon = faBacon
          this.mealText = "What did you eat for breakfast?";
          break;
        case 'lunch':
          this.mealText = "What did you eat for lunch?";
          this.icon = faFish;
          break;
        case 'coffee':
          this.mealText = "What did you eat for coffee?";
          this.icon = faCoffee;
          break;
        case 'dinner':
          this.mealText = "What did you eat for dinner?";
          this.icon = faCheese
          break;
        case 'snack':
          this.mealText = "What did you eat for snack?";
          this.icon = faCookieBite
          break;
      }
    }
    if(changes['description']) {
      this.mealForm.get('description')?.patchValue(this.description, {emitEvent: false, onlySelf: true});
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
