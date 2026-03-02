/**
 * UpdateCalorieBudget Use Case - Handles changing a user's daily calorie budget.
 *
 * This use case:
 * 1. Validates the new calorie budget via the CalorieBudget value object
 * 2. Persists the change through the user repository
 */

// Import repository interface for updating the user
import { UserRepository } from "../../domain/repositories/UserRepository";

// Import value object that validates the calorie budget (integer, 1–7000)
import { CalorieBudget } from "../../domain/valueObjects/CalorieBudget";

export class UpdateCalorieBudget {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Update the authenticated user's calorie budget.
     *
     * @param userId - The authenticated user's ID (from the session)
     * @param calorieBudget - The new calorie budget value (raw number)
     * @returns A success message string
     * @throws DomainError if the calorie budget value is invalid
     */
    async execute(userId: string, calorieBudget: number): Promise<string> {
        // Create a validated CalorieBudget value object (throws DomainError if invalid)
        const validatedBudget = new CalorieBudget(calorieBudget);

        // Persist the change
        await this.userRepository.updateCalorieBudget(userId, validatedBudget);

        return "Calorie budget updated successfully";
    }
}
