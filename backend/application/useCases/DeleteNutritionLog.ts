/**
 * DeleteNutritionLog Use Case - Handles deleting an existing nutrition log entry.
 *
 * This use case:
 * 1. Verifies the log exists and belongs to the requesting user
 * 2. Deletes the entry via the repository
 */

// Import repository interface for querying and deleting logs
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";

// Import DomainError for meaningful error responses
import { DomainError } from "../../domain/DomainError";

export class DeleteNutritionLog {
    // Repository dependency injected through constructor
    private readonly nutritionLogRepository: NutritionLogRepository;

    constructor(nutritionLogRepository: NutritionLogRepository) {
        this.nutritionLogRepository = nutritionLogRepository;
    }

    /**
     * Delete an existing nutrition log entry.
     *
     * @param input - The userId and logId identifying the entry to delete
     * @throws DomainError if the log is not found or doesn't belong to the user
     */
    async execute(input: { userId: string; logId: string }): Promise<void> {
        const { userId, logId } = input;

        // Verify the log exists and belongs to the user
        const existingLog = await this.nutritionLogRepository.findByUserAndLogId(userId, logId);

        if (!existingLog) {
            throw new DomainError("Nutrition log not found");
        }

        // Delete the log entry
        await this.nutritionLogRepository.delete(userId, logId);
    }
}
