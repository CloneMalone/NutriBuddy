// Import custom error for this domain
import { DomainError } from "../DomainError";

export class UserPassword {
    public readonly value: string;

    constructor(hashedPassword: string) {
        if (!hashedPassword.trim()) {
            throw new DomainError("Password hash must not be empty");
        }

        this.value = hashedPassword;
    }
}
