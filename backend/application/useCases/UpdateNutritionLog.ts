/**
 * UpdateNutritionLog Use Case - Handles editing an existing nutrition log entry.
 *
 * This use case:
 * 1. Verifies the log exists and belongs to the requesting user
 * 2. Creates a validated NutritionEntry value object with the new values
 * 3. Creates an updated NutritionLog entity
 * 4. Persists the changes via the repository
 */

// Import domain entity for nutrition logs
import { NutritionLog } from "../../domain/entities/NutritionLog";

// Import repository interface for persisting and querying logs
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";

// Import value object that validates calories, description, and emoji
import { NutritionEntry } from "../../domain/valueObjects/NutritionEntry";

// Import DomainError for meaningful error responses
import { DomainError } from "../../domain/DomainError";

export class UpdateNutritionLog {
    // Repository dependency injected through constructor
    private readonly nutritionLogRepository: NutritionLogRepository;

    constructor(nutritionLogRepository: NutritionLogRepository) {
        this.nutritionLogRepository = nutritionLogRepository;
    }

    /**
     * Update an existing nutrition log entry.
     *
     * @param input - The updated data from the HTTP request
     * @throws DomainError if the log is not found or input values are invalid
     */
    async execute(input: {
        id: string;
        userId: string;
        calories: number;
        description: string;
        emojiIcon: string;
        date: string;  // YYYY-MM-DD
    }): Promise<void> {
        const { id, userId, calories, description, emojiIcon, date } = input;

        // Verify the log exists and belongs to the user
        const existingLog = await this.nutritionLogRepository.findByUserAndLogId(userId, id);

        if (!existingLog) {
            throw new DomainError("Nutrition log not found");
        }

        // Create validated value object with the new values (validates calories, description, emoji)
        const updatedEntry = new NutritionEntry(calories, description, emojiIcon);

        // Create new entity instance with the updated values
        const updatedLog = new NutritionLog(id, userId, updatedEntry, date);

        // Persist the changes
        await this.nutritionLogRepository.update(updatedLog);
    }
}
