// Import custom error for this domain
import { DomainError } from "../DomainError";

export class Calories {
    public readonly value: number;

    constructor(value: number) {
        if (value <= 0) {
            throw new DomainError("Calories must be greater than zero");
        }

        this.value = value;
    }
}