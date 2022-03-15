import { User } from "./user";

export interface Meal {
    description: string;
    updated: Date
    owner: User;
    picture: string;
}
