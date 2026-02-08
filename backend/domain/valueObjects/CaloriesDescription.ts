// Import custom error for this domain
import { DomainError } from "../DomainError";

export class CaloriesDescription {
    public readonly value: string;

    constructor(value: string) {
        if (!value.trim()) {
            throw new DomainError("Description must not be empty");
        }

        this.value = value.trim();
    }
}