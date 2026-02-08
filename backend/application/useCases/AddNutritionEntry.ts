import { NutritionEntryRepository } from "../../domain/repositories/NutritionEntryRepository";
import { NutritionEntry } from "../../domain/entities/NutritionEntry";
import { Calories } from "../../domain/valueObjects/Calories";
import { CaloriesDescription } from "../../domain/valueObjects/CaloriesDescription";

export class AddNutritionEntry {
    private readonly nutritionEntryRepository: NutritionEntryRepository;

    constructor(nutritionEntryRepository: NutritionEntryRepository) {
        this.nutritionEntryRepository = nutritionEntryRepository;
    }

    async execute(input: {
        id: string;
        userId: string;
        calories: number;
        description: string;
        date: Date;
    }): Promise<void> {
        const entry = new NutritionEntry(
            input.id,
            input.userId,
            new Calories(input.calories),
            new CaloriesDescription(input.description),
            input.date
        );

        await this.nutritionEntryRepository.save(entry);
    }
}
