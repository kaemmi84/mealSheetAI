import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../interfaces/meal';
const AUTH_API = 'http://localhost:8000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(
    private http: HttpClient,
  ) { }

  getMeals(): Observable<any> {
    return this.http.get(`${AUTH_API}meals/`, httpOptions);
  }
}
