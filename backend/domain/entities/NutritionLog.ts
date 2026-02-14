// Import value objects that represent validated data for nutrition entries
import { NutritionEntry } from "../valueObjects/NutritionEntry";

export class NutritionLog {
    public readonly id: string;
    public readonly userId: string
    public readonly nutritionEntry: NutritionEntry;
    public readonly date: Date;

    constructor(
        id: string,
        userId: string,
        nutritionEntry: NutritionEntry,
        date: Date
    ) 
    {
        this.id = id;
        this.userId = userId;
        this.nutritionEntry = nutritionEntry;
        this.date = date;
    }
}
