// Import custom error for this domain
import { DomainError } from "../DomainError";

// This class represents a validated description of what was eaten
// It ensures that descriptions are not empty
export class CaloriesDescription {
    public readonly value: string; // The description text

    constructor(value: string) {
        // Check that the description has actual text (not just spaces)
        if (!value.trim()) {
            throw new DomainError("Description must not be empty");
        }

        // Store the description with whitespace trimmed
        this.value = value.trim();
    }
}