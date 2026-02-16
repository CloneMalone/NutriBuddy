/**
 * User Entity - Represents a registered user in our system.
 * 
 * An Entity is an object with a unique identity (the id field).
 * Unlike value objects, two users with the same data are NOT the same
 * if they have different IDs.
 * 
 * All properties are readonly because we treat entities as immutable.
 * If you need to change a user, create a new User object with updated values.
 */

// Import value objects - these ensure each field meets our business rules
import { UserEmail } from "../valueObjects/UserEmail";
import { UserPassword } from "../valueObjects/UserPassword";
import { UserCalorieBudget } from "../valueObjects/UserCalorieBudget";

export class User {
    constructor(
        // Unique identifier for this user (UUID format)
        public readonly id: string,
        
        // User's first name (plain string - no special validation needed)
        public readonly firstName: string,
        
        // User's last name (plain string - no special validation needed)
        public readonly lastName: string,
        
        // User's email wrapped in UserEmail value object (validates format)
        public readonly email: UserEmail,
        
        // Hashed password wrapped in UserPassword value object (ensures not empty)
        public readonly passwordHash: UserPassword,
        
        // Daily calorie goal wrapped in UserCalorieBudget value object (validates range 1-7000)
        public readonly calorieBudget: UserCalorieBudget
    ) { }
}
