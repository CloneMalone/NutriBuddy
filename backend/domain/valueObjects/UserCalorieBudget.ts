// Import custom error for this domain
import { DomainError } from "../DomainError";

// This class represents a validated daily calorie budget for a user
// It ensures the budget is a whole number between 1 and 7000
export class UserCalorieBudget {
    public readonly value: number; // The calorie budget amount

    constructor(value: number) {
        // Validate that the budget is a whole number (no decimals)
        if (!Number.isInteger(value)) {
            throw new DomainError("Calorie budget must be a number");
        }

        // Validate that the budget is between 1 and 7000 (reasonable range)
        if (value <= 0 || value > 7000) {
            throw new DomainError("Calorie budget must be between 1 and 7000");
        }

        // Store the validated budget
        this.value = value;
    }
}