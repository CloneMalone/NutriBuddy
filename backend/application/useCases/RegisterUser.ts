// Import tools for user registration
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { UserPassword } from "../../domain/valueObjects/UserPassword";
import { UserCalorieBudget } from "../../domain/valueObjects/UserCalorieBudget";
import { PasswordHasher } from "../../domain/services/PasswordHasher";
import { DomainError } from "../../domain/DomainError";

export class RegisterUser {
    private readonly userRepository: UserRepository;
    private readonly passwordHasher: PasswordHasher;

    constructor(
        userRepository: UserRepository,
        passwordHasher: PasswordHasher
    ) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute(input: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string; // plain password now
        calorieBudget: number;
    }): Promise<void> {

        const email = new UserEmail(input.email);
        const userCalorieBudget = new UserCalorieBudget(input.calorieBudget);

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new DomainError("User with this email already exists");
        }

        // Hash inside use case
        const hashedPassword = await this.passwordHasher.hash(input.password);
        const userPassword = new UserPassword(hashedPassword);

        const user = new User(
            input.id,
            input.firstName,
            input.lastName,
            email,
            userPassword,
            userCalorieBudget
        );

        await this.userRepository.save(user);
    }
}
