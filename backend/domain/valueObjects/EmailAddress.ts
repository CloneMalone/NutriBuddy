/**
 * EmailAddress Value Object - Represents and validates an email address.
 * 
 * Value Objects are small objects that hold a value and validate it.
 * They are IMMUTABLE (cannot be changed after creation).
 * Two EmailAddress objects with the same value are considered equal.
 * 
 * By validating in the constructor, we guarantee that ANY EmailAddress
 * object in our system contains a valid email. If validation fails,
 * an error is thrown and the object is never created.
 */

// Import DomainError so we can throw meaningful business logic errors
import { DomainError } from "../DomainError";

export class EmailAddress {
    // The actual email string, stored after validation
    public readonly value: string;

    constructor(value: string) {
        // Normalize the email: remove whitespace and convert to lowercase
        // This ensures "John@Example.com" is treated the same as "john@example.com"
        const normalized = value.trim().toLowerCase();

        // Validation: Email must not be empty
        if (!normalized) {
            throw new DomainError("Email must not be empty");
        }

        // Validation: Email must contain @ symbol (basic format check)
        if (!normalized.includes("@")) {
            throw new DomainError("Email must be a valid email address");
        }

        // All validations passed - store the normalized email
        this.value = normalized;
    }
}
