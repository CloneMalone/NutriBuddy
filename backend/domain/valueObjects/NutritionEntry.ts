/**
 * NutritionEntry Value Object - Represents the core data of a nutrition log.
 * 
 * Contains the calories and description of a food item.
 * Validates that calories are positive and within reasonable limits,
 * and that a description is provided.
 */

// Import DomainError so we can throw meaningful business logic errors
import { DomainError } from "../DomainError";

export class NutritionEntry {
    // The number of calories in this food item
    public readonly calories: number;
    
    // A description of what was eaten (e.g., "Grilled chicken salad")
    public readonly description: string;

    // An emoji representing the food item
    public readonly emojiIcon: string;

    constructor(calories: number, description: string, emojiIcon: string) {
        // Validation: Description must not be empty
        if (!description.trim()) {
            throw new DomainError("Description must not be empty");
        }

        // Validation: Calories must be provided (not undefined or null)
        if (calories === undefined || calories === null) {
            throw new DomainError("Calories must be provided");
        }

        // Validation: Calories must be a positive number
        if (calories <= 0) {
            throw new DomainError("Calories must be greater than zero");
        }

        // Validation: Calories must be reasonable (single item shouldn't exceed 10,000)
        if (calories > 10000) {
            throw new DomainError("Calories must be less than 10,000");
        }

        // Validation: Description should be reasonably short (e.g., max 50 characters)
        if (description.length > 50) {
            throw new DomainError("Description must be 50 characters or less");
        }

        // Validation: Emoji icon must be a single character
        if (emojiIcon.length > 2) {
            throw new DomainError("Emoji icon must be a single emoji character");
        }

        if (emojiIcon.length === 0) {
            this.emojiIcon = "🍽️"; // Default icon if none provided
        }

        // All validations passed - store the values
        this.calories = calories;
        this.description = description.trim();
        this.emojiIcon = emojiIcon;

    }
}