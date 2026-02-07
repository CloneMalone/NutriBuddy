// Import everything we need for user authentication
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { DomainError } from "../../domain/DomainError";
import { User } from "../../domain/entities/User";
import { PasswordHasher } from "../../domain/services/PasswordHasher";

// This class handles the login process for users
export class LoginUser {
    // Store the repository to look up users in the database
    private readonly userRepository: UserRepository;
    // Store the password hasher to verify passwords
    private readonly passwordHasher: PasswordHasher;

    // Constructor receives both the repository and password hasher
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    // Main login method that verifies email and password
    async execute(input: { email: string; password: string }): Promise<User> {
        // Validate and normalize the email (this throws an error if email is invalid)
        const email = new UserEmail(input.email);

        // Look up the user by email in the database
        const user = await this.userRepository.findByEmail(email);
        // If no user found, reject the login attempt
        if (!user) throw new DomainError("Invalid email or password");

        // Check if the provided password matches the stored hashed password
        if (!(await this.passwordHasher.matches(input.password, user.passwordHash.value))) {
            // If password doesn't match, reject the login
            throw new DomainError("Invalid email or password");
        }

        // If everything checks out, return the user object
        return user;
    }
}
