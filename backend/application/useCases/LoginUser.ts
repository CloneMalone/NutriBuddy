/**
 * LoginUser Use Case - Handles the business logic for user authentication.
 * 
 * This use case:
 * 1. Looks up the user by email
 * 2. Verifies the password matches
 * 3. Returns the user if authentication succeeds
 * 
 * Note: This use case doesn't create sessions - that's handled by the controller.
 * Use cases should focus on business logic, not HTTP concerns like cookies.
 */

// Import repository interface for looking up users
import { UserRepository } from "../../domain/repositories/UserRepository";

// Import value object for email validation
import { UserEmail } from "../../domain/valueObjects/UserEmail";

// Import error type for authentication failures
import { DomainError } from "../../domain/DomainError";

// Import User entity (returned on successful login)
import { User } from "../../domain/entities/User";

// Import service interface for password verification
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class LoginUser {
    // Dependencies injected through constructor
    private readonly userRepository: UserRepository;
    private readonly passwordHasher: PasswordHasher;

    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    /**
     * Attempt to authenticate a user.
     * 
     * @param input - Email and password from login form
     * @returns The authenticated User entity
     * @throws DomainError if credentials are invalid (same message for both email and password errors)
     */
    async execute(input: { email: string; password: string }): Promise<User> {
        // Step 1: Create validated email value object
        const email = new UserEmail(input.email);

        // Step 2: Look up the user in the database
        const user = await this.userRepository.findByEmail(email);
        
        // Step 3: Check if user exists
        // We use a generic error message to avoid revealing whether an email is registered
        if (!user) throw new DomainError("Invalid email or password");

        // Step 4: Verify the password matches the stored hash
        // passwordHasher.matches() compares plain password to hashed version
        if (!(await this.passwordHasher.matches(input.password, user.passwordHash.value))) {
            throw new DomainError("Invalid email or password");
        }

        // Step 5: Authentication successful - return the user
        return user;
    }
}
