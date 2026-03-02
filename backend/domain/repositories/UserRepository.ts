/**
 * UserRepository Interface - Defines how we store and retrieve User entities.
 * 
 * This is an ABSTRACTION (interface) in the Domain layer. It says WHAT operations
 * we need, but NOT HOW they are implemented. The actual implementation
 * (SQLiteUserRepository) lives in the Infrastructure layer.
 * 
 * This separation allows us to swap databases without changing business logic.
 * For example, we could switch from SQLite to PostgreSQL just by creating a new
 * implementation - RegisterUser and LoginUser use cases wouldn't change at all.
 */

// Import the entity and value object this repository handles
import { User } from "../entities/User";
import { EmailAddress } from "../valueObjects/EmailAddress";
import { CalorieBudget } from "../valueObjects/CalorieBudget";

export interface UserRepository {
    // Save a new user to the database
    save(user: User): Promise<void>;
    
    // Find a user by their email address (used for login and duplicate checking)
    // Returns null if no user exists with that email
    findByEmail(email: EmailAddress): Promise<User | null>;
    
    // Find a user by their unique ID
    // Returns null if no user exists with that ID
    findById(id: string): Promise<User | null>;

    // Update a user's daily calorie budget
    updateCalorieBudget(userId: string, calorieBudget: CalorieBudget): Promise<void>;
}
