/**
 * GetUserProfile Use Case - Retrieves the authenticated user's profile data.
 *
 * This use case:
 * 1. Looks up the user by their ID (from the session)
 * 2. Returns a plain object with profile fields (no password hash)
 *
 * Used by the GET /api/users/me endpoint so the frontend can display
 * the user's name, email, and calorie budget after login.
 */

// Import repository interface for looking up users
import { UserRepository } from "../../domain/repositories/UserRepository";

// Import error type for "user not found" scenario
import { DomainError } from "../../domain/DomainError";

/** Shape of the data returned to the controller — intentionally excludes the password hash. */
export interface UserProfileDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    calorieBudget: number;
}

export class GetUserProfile {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Fetch the profile for the given user ID.
     *
     * @param userId - The authenticated user's ID (from the session)
     * @returns A plain DTO with profile fields
     * @throws DomainError if the user no longer exists
     */
    async execute(userId: string): Promise<UserProfileDTO> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new DomainError("User not found");
        }

        // Map the entity to a plain DTO — never expose the password hash
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email.value,
            calorieBudget: user.calorieBudget.value,
        };
    }
}
