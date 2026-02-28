
// Import repository interface for querying logs
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";

// Import entity type (what we return)
import { NutritionLog } from "../../domain/entities/NutritionLog";

export class GetNutritionLogById {
    // Repository dependency injected through constructor
    private readonly nutritionLogRepository: NutritionLogRepository;

    constructor(nutritionLogRepository: NutritionLogRepository) {
        this.nutritionLogRepository = nutritionLogRepository;
    }

    /**
     * Fetch a specific nutrition log by user ID and log ID.
     *
     * @param input - User ID and log ID to query
     * @returns The NutritionLog entity if found, or null if not found
     */
    async execute(input: { userId: string; logId: string }): Promise<NutritionLog | null> {
        const { userId, logId } = input;
        return this.nutritionLogRepository.findByUserAndLogId(userId, logId);
    }
}