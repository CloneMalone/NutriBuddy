// Import value objects that represent validated data for nutrition entries
import { Calories } from "../valueObjects/Calories";
import { CaloriesDescription } from "../valueObjects/CaloriesDescription";

// This class represents a single nutrition entry (like "ate an apple with 50 calories")
export class NutritionEntry {
    // Constructor defines all the properties of a nutrition entry
    // All properties are read-only (immutable) to prevent accidental changes
    constructor(
        public readonly id: string, // Unique identifier for this entry
        public readonly userId: string, // Which user this entry belongs to
        public readonly calories: Calories, // How many calories (validated value object)
        public readonly description: CaloriesDescription, // What was eaten (validated value object)
        public readonly date: Date // When this entry was recorded
    ) { }
}
