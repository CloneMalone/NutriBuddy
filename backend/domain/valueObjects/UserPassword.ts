// Import custom error for this domain
import { DomainError } from "../DomainError";

// This class represents a validated hashed password
// It stores the already-hashed password and ensures it's not empty
export class UserPassword {
    public readonly value: string; // The hashed password

    constructor(hashedPassword: string) {
        // Validate that the password hash is not empty
        if (!hashedPassword.trim()) {
            throw new DomainError("Password hash must not be empty");
        }

        // Store the hashed password
        this.value = hashedPassword;
    }
}
