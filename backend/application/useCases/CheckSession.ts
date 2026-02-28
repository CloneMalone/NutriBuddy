/**
 * CheckSession Use Case - Validates that a session belongs to an existing user.
 *
 * This use case:
 * 1. Receives the userId that the session middleware already resolved from the cookie
 * 2. Confirms the user record still exists in the database
 * 3. Returns a simple { authenticated: true } result
 *
 * Used by GET /api/users/check-session so the frontend can auto-redirect
 * already-authenticated users away from the login page.
 */

// Import repository interface for looking up users
import { UserRepository } from "../../domain/repositories/UserRepository";

// Import error type for "user not found" scenario
import { DomainError } from "../../domain/DomainError";

/** Shape of the data returned to the controller. */
export interface CheckSessionResult {
    authenticated: boolean;
}

export class CheckSession {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Verify the user behind the current session still exists.
     *
     * @param userId - The authenticated user's ID (resolved by session middleware)
     * @returns { authenticated: true } when the user exists
     * @throws DomainError if the user record no longer exists
     */
    async execute(userId: string): Promise<CheckSessionResult> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new DomainError("Session invalid");
        }

        return { authenticated: true };
    }
}
