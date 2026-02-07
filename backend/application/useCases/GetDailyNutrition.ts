// Import the repository and entity we need to fetch nutrition data
import { NutritionEntryRepository } from "../../domain/repositories/NutritionEntryRepository";
import { NutritionEntry } from "../../domain/entities/NutritionEntry";

// This class handles getting all nutrition entries for a specific user on a specific day
export class GetDailyNutrition {
    // Store reference to the repository to query nutrition data
    private readonly nutritionEntryRepository: NutritionEntryRepository;

    // Constructor receives the repository when the class is created
    constructor(nutritionEntryRepository: NutritionEntryRepository) {
        this.nutritionEntryRepository = nutritionEntryRepository;
    }

    // Fetch and return all nutrition entries for a user on a given date
    async execute(input: {
        userId: string;
        date: Date;
    }): Promise<NutritionEntry[]> {
        // Query the database for all entries matching this user and date, then return them
        return this.nutritionEntryRepository.findByUserAndDate(
            input.userId,
            input.date
        );
    }
}
