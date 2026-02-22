/**
 * HashedPassword Value Object - Holds a bcrypt-hashed password.
 * 
 * IMPORTANT: This does NOT hold plain text passwords!
 * The password is hashed BEFORE being wrapped in this value object.
 * 
 * For validating raw user password input (strength rules, confirmation),
 * see the PlainPassword value object.
 * 
 * This value object simply ensures the hash string is not empty.
 * The actual hashing is done by the PasswordHasher service.
 */

// Import DomainError so we can throw meaningful business logic errors
import { DomainError } from "../DomainError";

export class HashedPassword {
    // The hashed password string (e.g., "$2b$10$N9qo8uLOickgx...")
    public readonly value: string;

    constructor(hashedPassword: string) {
        // Validation: The hash must not be empty or just whitespace
        if (!hashedPassword.trim()) {
            throw new DomainError("Password hash must not be empty");
        }

        // Store the hashed password
        this.value = hashedPassword;
    }
}
