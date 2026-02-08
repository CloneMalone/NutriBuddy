// Import value objects that represent validated user data
import { UserEmail } from "../valueObjects/UserEmail";
import { UserPassword } from "../valueObjects/UserPassword";
import { UserCalorieBudget } from "../valueObjects/UserCalorieBudget";

export class User {
    constructor(
        public readonly id: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: UserEmail,
        public readonly passwordHash: UserPassword,
        public readonly calorieBudget: UserCalorieBudget
    ) { }
}
