/**
 * RegisterUser Use Case - Handles the business logic for user registration.
 * 
 * Use Cases (also called Application Services) orchestrate the flow of data
 * between the controller and domain layer. They contain NO business rules
 * themselves - those live in entities and value objects.
 * 
 * This use case:
 * 1. Creates validated value objects from raw input
 * 2. Checks if email is already taken
 * 3. Hashes the password securely
 * 4. Creates a User entity
 * 5. Saves the user to the database
 */

// Import repository interface (abstraction, not the SQLite implementation)
import { UserRepository } from "../../domain/repositories/UserRepository";

// Import domain entities and value objects
import { User } from "../../domain/entities/User";
import { EmailAddress } from "../../domain/valueObjects/EmailAddress";
import { HashedPassword } from "../../domain/valueObjects/HashedPassword";
import { PlainPassword } from "../../domain/valueObjects/PlainPassword";
import { CalorieBudget } from "../../domain/valueObjects/CalorieBudget";

// Import service interface for password hashing
import { PasswordHasher } from "../../domain/services/PasswordHasher";

// Import error type for domain validation failures
import { DomainError } from "../../domain/DomainError";

export class RegisterUser {
    // Dependencies are injected through the constructor (Dependency Injection)
    // We store interfaces, not concrete implementations
    private readonly userRepository: UserRepository;
    private readonly passwordHasher: PasswordHasher;

    constructor(
        userRepository: UserRepository,
        passwordHasher: PasswordHasher
    ) {
        // Store the injected dependencies for use in execute()
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    /**
     * Execute the registration process.
     * 
     * @param input - Raw data from the HTTP request
     * @throws DomainError if validation fails or email already exists
     */
    async execute(input: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        calorieBudget: number;
    }): Promise<void> {

        // Step 1: Create validated value objects
        // These constructors will throw DomainError if validation fails
        const email = new EmailAddress(input.email);
        const passwordEntry = new PlainPassword(input.password, input.confirmPassword);
        const calorieBudget = new CalorieBudget(input.calorieBudget);

        // Step 2: Check if a user already exists with this email
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new DomainError("User with this email already exists");
        }

        // Step 3: Hash the validated password using our password hasher service
        // This converts the plain-text password into something like "$2b$10$N9qo8uLOickgx..."
        const hashedPassword = await this.passwordHasher.hash(passwordEntry.value);
        const userPassword = new HashedPassword(hashedPassword);

        // Step 4: Create the User entity with all validated data
        const user = new User(
            input.id,
            input.firstName,
            input.lastName,
            email,
            userPassword,
            calorieBudget
        );

        // Step 5: Persist the user to the database
        await this.userRepository.save(user);
    }
}
