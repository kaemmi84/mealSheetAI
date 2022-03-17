import { User } from "./user";
import {MealTime} from "../helpers/meal-time";

export interface Meal {
    id?: number;
    description?: string;
    mealTimestamp: Date;
    mealTime: 'breakfast' | 'lunch' | 'coffee'| 'dinner' | 'snack';
}
