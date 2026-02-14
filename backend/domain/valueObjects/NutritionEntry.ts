// Import custom error for this domain
import { DomainError } from "../DomainError";

export class NutritionEntry {
    public readonly calories: number;
    public readonly description: string;

    constructor(calories: number, description: string) {
        if (!description.trim()) {
            throw new DomainError("Description must not be empty");
        }

        if (calories === undefined || calories === null) {
            throw new DomainError("Calories must be provided");
        }


        if (calories <= 0) {
            throw new DomainError("Calories must be greater than zero");
        }

        if (calories > 10000) {
            throw new DomainError("Calories must be less than 10,000");
        }

        this.calories = calories;
        this.description = description.trim();
    }
}