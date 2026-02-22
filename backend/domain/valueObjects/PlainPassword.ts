/**
 * PlainPassword Value Object - Validates a user's raw password input.
 * 
 * This value object represents the plain-text password as entered by the user
 * during registration. It enforces password strength rules and confirms that
 * the password and confirmation match.
 * 
 * IMPORTANT: This is NOT the hashed password. After validation, the `value`
 * should be passed to the PasswordHasher service for hashing, and the result
 * stored in a HashedPassword value object.
 * 
 * Password rules:
 * - At least 8 characters
 * - At least 1 uppercase letter
 * - At least 1 number
 * - At least 1 special character
 * - Password and confirmation must match
 */

import { DomainError } from "../DomainError";

export class PlainPassword {
    public readonly value: string;

    constructor(password: string, confirmPassword: string) {
        // Validation: Passwords must match
        if (password !== confirmPassword) {
            throw new DomainError("Passwords do not match");
        }

        // Validation: Minimum length of 8 characters
        if (password.length < 8) {
            throw new DomainError("Password must be at least 8 characters");
        }

        // Validation: At least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            throw new DomainError("Password must contain at least one uppercase letter");
        }

        // Validation: At least one number
        if (!/[0-9]/.test(password)) {
            throw new DomainError("Password must contain at least one number");
        }

        // Validation: At least one special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
            throw new DomainError("Password must contain at least one special character");
        }

        // All validations passed - store the plain-text password for hashing
        this.value = password;
    }
}
