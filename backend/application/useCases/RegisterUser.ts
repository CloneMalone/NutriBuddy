// Import tools for user registration
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { UserPassword } from "../../domain/valueObjects/UserPassword";
import { UserCalorieBudget } from "../../domain/valueObjects/UserCalorieBudget";
import { DomainError } from "../../domain/DomainError";

export class RegisterUser {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(input: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        passwordHash: string;
        calorieBudget: number;
    }): Promise<void> {
        const email = new UserEmail(input.email);
        const userPassword = new UserPassword(input.passwordHash);
        const userCalorieBudget = new UserCalorieBudget(input.calorieBudget);

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new DomainError("User with this email already exists");
        }

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
