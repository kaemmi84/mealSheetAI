import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Meal } from '../interfaces/meal';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];

  constructor(
    public oauthService: OAuthService,
    private mealService: MealService,
  ) { }

  ngOnInit(): void {
    if(this.oauthService.hasValidAccessToken()){
      this.loadMeals()
    }
  }

  loadMeals() {
    this.mealService.getMeals().subscribe(meals => {
      this.meals = meals;
      console.log(this.meals);
    });
  }

}
