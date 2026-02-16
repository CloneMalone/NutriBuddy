/**
 * GetNutritionLogsByDate Use Case - Retrieves all nutrition logs for a user on a specific date.
 * 
 * This is a simple query use case - it just fetches data without modifying anything.
 * Used to display the user's food diary for a given day.
 */

// Import repository interface for querying logs
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";

// Import entity type (what we return)
import { NutritionLog } from "../../domain/entities/NutritionLog";

export class GetNutritionLogsByDate {
    // Repository dependency injected through constructor
    private readonly nutritionLogRepository: NutritionLogRepository;

    constructor(nutritionLogRepository: NutritionLogRepository) {
        this.nutritionLogRepository = nutritionLogRepository;
    }

    /**
     * Fetch all nutrition logs for the given user and date.
     * 
     * @param input - User ID and date to query
     * @returns Array of NutritionLog entities (empty if no logs for that date)
     */
    async execute(input: {
        userId: string;
        date: Date;
    }): Promise<NutritionLog[]> {
        // Delegate to the repository to fetch matching logs
        return this.nutritionLogRepository.findByUserAndDate(
            input.userId,
            input.date
        );
    }
}
