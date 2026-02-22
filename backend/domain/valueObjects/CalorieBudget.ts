/**
 * CalorieBudget Value Object - Represents a user's daily calorie goal.
 * 
 * Validates that the calorie budget is within a reasonable range.
 * Most adults need between 1,500-3,000 calories per day, but we allow
 * up to 7,000 to accommodate athletes or special circumstances.
 */

// Import DomainError so we can throw meaningful business logic errors
import { DomainError } from "../DomainError";

export class CalorieBudget {
    // The calorie budget as a whole number
    public readonly value: number;

    constructor(value: number) {
        // Validation: Must be a whole number (no decimals)
        if (!Number.isInteger(value)) {
            throw new DomainError("Calorie budget must be a number");
        }

        // Validation: Must be in a reasonable range (1 to 7000 calories)
        if (value <= 0 || value > 7000) {
            throw new DomainError("Calorie budget must be between 1 and 7000");
        }

        // All validations passed - store the value
        this.value = value;
    }
}
