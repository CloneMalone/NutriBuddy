// Import bcrypt library for secure password hashing
import bcrypt from "bcrypt";
// Import the interface we need to implement
import { PasswordHasher } from "../../domain/services/PasswordHasher";

// This class implements password verification using bcrypt
// Bcrypt is a secure library specifically designed for password hashing
export class BcryptPasswordHasher implements PasswordHasher {
    // Verify if a plain text password matches a bcrypt hash
    async matches(plain: string, hash: string): Promise<boolean> {
        // Use bcrypt to compare the plain password with the stored hash
        // Returns true if they match, false otherwise
        return bcrypt.compare(plain, hash);
    }
}

