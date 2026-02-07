// Import custom error for this domain
import { DomainError } from "../DomainError";

// This class represents a validated calorie value
// It ensures that only positive calorie numbers are created
export class Calories {
    public readonly value: number; // The actual calorie number

    constructor(value: number) {
        // Validate that calories is a positive number
        if (value <= 0) {
            throw new DomainError("Calories must be greater than zero");
        }

        // Store the validated value
        this.value = value;
    }
}