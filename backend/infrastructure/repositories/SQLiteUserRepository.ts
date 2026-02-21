/**
 * SQLiteUserRepository - Concrete implementation of UserRepository using SQLite.
 * 
 * This class is the bridge between our domain entities and the SQLite database.
 * It handles:
 * - Converting User entities to database rows (for saving)
 * - Converting database rows back to User entities (for reading)
 * 
 * IMPORTANT: The domain layer (entities, use cases) doesn't know this class exists!
 * They only know about the UserRepository interface. This is the power of abstraction.
 */

// Import the interface we're implementing (defined in domain layer)
import { UserRepository } from "../../domain/repositories/UserRepository";

// Import domain entities and value objects
import { User } from "../../domain/entities/User";
import { UserEmailEntry } from "../../domain/valueObjects/UserEmailEntry";
import { UserHashedPassword } from "../../domain/valueObjects/UserHashedPassword";
import { UserCalorieBudget } from "../../domain/valueObjects/UserCalorieBudget";

// Import the database client interface
import { DatabaseClient } from "../database/DatabaseClient";

/**
 * Type definition for how user data looks in the database.
 * Column names use snake_case (database convention),
 * while our domain uses camelCase (JavaScript convention).
 */
interface UserRow {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    calorie_budget: number;
}

export class SQLiteUserRepository implements UserRepository {
    // Database client injected through constructor
    constructor(private readonly db: DatabaseClient) {}

    /**
     * Save a new user to the database.
     * 
     * @param user - The User entity to save
     */
    async save(user: User): Promise<void> {
        // Insert the user data, extracting primitive values from value objects
        await this.db.run(
            `
            INSERT INTO users (
                id,
                first_name,
                last_name,
                email,
                password_hash,
                calorie_budget
            ) VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                user.id,
                user.firstName,
                user.lastName,
                user.email.value,           // Extract string from UserEmailEntry
                user.passwordHash.value,    // Extract string from UserHashedPassword  
                user.calorieBudget.value    // Extract number from UserCalorieBudget
            ]
        );
    }

    /**
     * Find a user by their email address.
     * 
     * @param email - The email to search for (as a UserEmailEntry value object)
     * @returns The User if found, or null if not found
     */
    async findByEmail(email: UserEmailEntry): Promise<User | null> {
        // Query the database for a matching email
        const row = await this.db.get<UserRow>(
            `
            SELECT * FROM users
            WHERE email = ?
            `,
            [email.value]
        );

        // Return null if no user found
        if (!row) return null;

        // Convert database row to User entity
        return this.mapRowToUser(row);
    }

    /**
     * Find a user by their unique ID.
     * 
     * @param id - The user's UUID
     * @returns The User if found, or null if not found
     */
    async findById(id: string): Promise<User | null> {
        // Query the database for a matching ID
        const row = await this.db.get<UserRow>(
            `
            SELECT * FROM users
            WHERE id = ?
            `,
            [id]
        );

        // Return null if no user found
        if (!row) return null;

        // Convert database row to User entity
        return this.mapRowToUser(row);
    }

    /**
     * Convert a database row into a User entity.
     * 
     * This is where we reconstruct value objects from primitive database values.
     * Since the values already passed validation when first saved,
     * the value object constructors should not throw here.
     */
    private mapRowToUser(row: UserRow): User {
        return new User(
            row.id,
            row.first_name,
            row.last_name,
            new UserEmailEntry(row.email),                // Wrap email string in value object
            new UserHashedPassword(row.password_hash),   // Wrap hash string in value object
            new UserCalorieBudget(row.calorie_budget)    // Wrap number in value object
        );
    }
}
