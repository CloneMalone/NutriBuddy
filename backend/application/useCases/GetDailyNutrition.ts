// Import the repository and entity we need to fetch nutrition data
import { NutritionEntryRepository } from "../../domain/repositories/NutritionEntryRepository";
import { NutritionEntry } from "../../domain/entities/NutritionEntry";

export class GetDailyNutrition {
    private readonly nutritionEntryRepository: NutritionEntryRepository;

    constructor(nutritionEntryRepository: NutritionEntryRepository) {
        this.nutritionEntryRepository = nutritionEntryRepository;
    }

    async execute(input: {
        userId: string;
        date: Date;
    }): Promise<NutritionEntry[]> {
        return this.nutritionEntryRepository.findByUserAndDate(
            input.userId,
            input.date
        );
    }
}
