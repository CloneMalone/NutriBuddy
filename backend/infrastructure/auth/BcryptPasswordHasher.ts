/**
 * BcryptPasswordHasher - Concrete implementation of the PasswordHasher interface.
 * 
 * Uses the bcrypt library to securely hash passwords. Bcrypt is a widely-used,
 * battle-tested hashing algorithm specifically designed for passwords.
 * 
 * This class lives in Infrastructure because it depends on an external library.
 * The domain/ layer doesn't know bcrypt exists - it only knows the PasswordHasher interface.
 */

// Import bcrypt library for secure password hashing
import bcrypt from "bcrypt";

// Import the interface we're implementing
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
    // Salt rounds determines how much computational work bcrypt does
    // Higher = more secure but slower. 10 is a good balance.
    private readonly saltRounds = 10;

    /**
     * Hash a plain text password.
     * 
     * @param plain - The user's plain text password (e.g., "secret123")
     * @returns A secure hash string (e.g., "$2b$10$N9qo8uLOickgx...")
     */
    async hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, this.saltRounds);
    }

    /**
     * Check if a plain text password matches a stored hash.
     * 
     * @param plain - The password the user just entered
     * @param hash - The hash stored in the database
     * @returns True if the password is correct, false otherwise
     */
    async matches(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }
}
