// Import custom error for this domain
import { DomainError } from "../DomainError";

export class UserEmail {
    public readonly value: string;

    constructor(value: string) {
        const normalized = value.trim().toLowerCase();

        if (!normalized) {
            throw new DomainError("Email must not be empty");
        }

        if (!normalized.includes("@")) {
            throw new DomainError("Email must be a valid email address");
        }

        this.value = normalized;
    }
}
