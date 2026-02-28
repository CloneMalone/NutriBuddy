/**
 * NutritionLog Entity - Represents a single food/nutrition entry logged by a user.
 * 
 * Each log tracks what the user ate, how many calories it contained, and when.
 * The log is tied to a specific user via userId, so users can only see
 * and manage their own nutrition logs.
 */

// Import the NutritionEntry value object which validates calories and description
import { NutritionEntry } from "../valueObjects/NutritionEntry";

export class NutritionLog {
    // Unique identifier for this log entry (UUID format)
    public readonly id: string;
    
    // Reference to the user who created this log (foreign key to users table)
    public readonly userId: string;
    
    // The nutrition data (calories + description) wrapped in a value object
    public readonly nutritionEntry: NutritionEntry;
    
    // The date this food was consumed (YYYY-MM-DD string to avoid timezone bugs)
    public readonly date: string;

    constructor(
        id: string,
        userId: string,
        nutritionEntry: NutritionEntry,
        date: string
    ) {
        // Assign all values to their respective properties
        this.id = id;
        this.userId = userId;
        this.nutritionEntry = nutritionEntry;
        this.date = date;
    }
}
