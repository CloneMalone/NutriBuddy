// Import value objects that represent validated user data
import { UserEmail } from "../valueObjects/UserEmail";
import { UserPassword } from "../valueObjects/UserPassword";
import { UserCalorieBudget } from "../valueObjects/UserCalorieBudget";

// This class represents a user in the system
export class User {
    // Constructor defines all the properties of a user
    // All properties are read-only (immutable) to prevent accidental changes
    constructor(
        public readonly id: string, // Unique identifier for the user
        public readonly firstName: string, // User's first name
        public readonly lastName: string, // User's last name
        public readonly email: UserEmail, // User's email (validated value object)
        public readonly passwordHash: UserPassword, // User's hashed password (validated value object)
        public readonly calorieBudget: UserCalorieBudget // User's daily calorie goal (validated value object)
    ) { }
}
