// Import custom error for this domain
import { DomainError } from "../DomainError";

// This class represents a validated email address
// It ensures emails are properly formatted and normalized
export class UserEmail {
    public readonly value: string; // The email address

    constructor(value: string) {
        // Normalize the email: remove extra spaces, convert to lowercase
        const normalized = value.trim().toLowerCase();

        // Check that the email is not empty
        if (!normalized) {
            throw new DomainError("Email must not be empty");
        }

        // Check that the email contains an @ symbol (basic validation)
        if (!normalized.includes("@")) {
            throw new DomainError("Email must be a valid email address");
        }

        // Store the normalized and validated email
        this.value = normalized;
    }
}
