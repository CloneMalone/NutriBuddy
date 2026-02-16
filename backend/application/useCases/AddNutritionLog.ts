/**
 * AddNutritionLog Use Case - Handles creating new nutrition log entries.
 * 
 * This use case:
 * 1. Creates a validated NutritionEntry value object
 * 2. Creates a NutritionLog entity
 * 3. Saves the log to the database
 * 
 * The controller handles authentication (verifying the user is logged in)
 * before calling this use case.
 */

// Import domain entity for nutrition logs
import { NutritionLog } from "../../domain/entities/NutritionLog";

// Import repository interface for persisting logs
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";

// Import value object that validates calories and description
import { NutritionEntry } from "../../domain/valueObjects/NutritionEntry";

export class AddNutritionLog {
    // Repository dependency injected through constructor
    private readonly nutritionLogRepository: NutritionLogRepository;

    constructor(nutritionLogRepository: NutritionLogRepository) {
        this.nutritionLogRepository = nutritionLogRepository;
    }

    /**
     * Create and save a new nutrition log entry.
     * 
     * @param input - Data from the HTTP request
     * @throws DomainError if calories or description are invalid
     */
    async execute(input: {
        id: string;
        userId: string;
        calories: number;
        description: string;
        date: Date;
    }): Promise<void> {
        // Step 1: Create validated NutritionEntry value object
        // This will throw DomainError if calories <= 0 or > 10000, or if description is empty
        const entry = new NutritionEntry(input.calories, input.description);

        // Step 2: Create the NutritionLog entity
        const log = new NutritionLog(
            input.id,
            input.userId,
            entry,
            input.date
        );

        // Step 3: Persist to the database
        await this.nutritionLogRepository.save(log);
    }
}
