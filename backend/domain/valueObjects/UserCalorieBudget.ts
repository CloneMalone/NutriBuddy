// Import custom error for this domain
import { DomainError } from "../DomainError";

export class UserCalorieBudget {
    public readonly value: number;

    constructor(value: number) {
        if (!Number.isInteger(value)) {
            throw new DomainError("Calorie budget must be a number");
        }

        if (value <= 0 || value > 7000) {
            throw new DomainError("Calorie budget must be between 1 and 7000");
        }

        this.value = value;
    }
}