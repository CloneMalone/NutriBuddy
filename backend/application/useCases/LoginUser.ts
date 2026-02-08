// Import everything we need for user authentication
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { DomainError } from "../../domain/DomainError";
import { User } from "../../domain/entities/User";
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class LoginUser {
    private readonly userRepository: UserRepository;
    private readonly passwordHasher: PasswordHasher;

    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute(input: { email: string; password: string }): Promise<User> {
        const email = new UserEmail(input.email);

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new DomainError("Invalid email or password");

        if (!(await this.passwordHasher.matches(input.password, user.passwordHash.value))) {
            throw new DomainError("Invalid email or password");
        }

        return user;
    }
}
