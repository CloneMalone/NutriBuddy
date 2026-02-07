// Import the entity and value object this repository handles
import { User } from "../entities/User";
import { UserEmail } from "../valueObjects/UserEmail";

// This interface defines the contract for saving and retrieving users from the database
// Any class that implements this interface must provide these methods
export interface UserRepository {
    // Save a new user or update an existing user in the database
    save(user: User): Promise<void>;
    // Find a user by their email, returns null if not found
    findByEmail(email: UserEmail): Promise<User | null>;
    // Find a user by their ID, returns null if not found
    findById(id: string): Promise<User | null>;
}
