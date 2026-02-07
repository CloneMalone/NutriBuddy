// Import tools for user registration
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { UserPassword } from "../../domain/valueObjects/UserPassword";
import { UserCalorieBudget } from "../../domain/valueObjects/UserCalorieBudget";
import { DomainError } from "../../domain/DomainError";

// This class handles creating new user accounts
export class RegisterUser {
    // Store the repository to save new users to the database
    private readonly userRepository: UserRepository;

    // Constructor receives the repository when the class is created
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // Main registration method that creates and saves a new user
    async execute(input: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        calorieBudget: number;
    }): Promise<void> {
        // Validate and normalize the email
        const email = new UserEmail(input.email);
        // Validate the password hash (make sure it's not empty)
        const userPassword = new UserPassword(input.passwordHash);
        // Validate the calorie budget (must be between 1 and 7000)
        const userCalorieBudget = new UserCalorieBudget(input.calorieBudget);

        // Check if a user with this email already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            // Reject registration if email is already in use
            throw new DomainError("User with this email already exists");
        }

        // Create a new user object with all the validated data
        const user = new User(
            input.id,
            input.firstName,
            input.lastName,
            email,
            userPassword,
            userCalorieBudget
        );

        // Save the new user to the database
        await this.userRepository.save(user);
    }
}
