// Import value objects that represent validated data for nutrition entries
import { Calories } from "../valueObjects/Calories";
import { CaloriesDescription } from "../valueObjects/CaloriesDescription";

export class NutritionEntry {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly calories: Calories,
        public readonly description: CaloriesDescription,
        public readonly date: Date
    ) { }
}
