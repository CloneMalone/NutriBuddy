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
import { EmailAddress } from "../../domain/valueObjects/EmailAddress";
import { HashedPassword } from "../../domain/valueObjects/HashedPassword";
import { CalorieBudget } from "../../domain/valueObjects/CalorieBudget";

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
                user.email.value,           // Extract string from EmailAddress
                user.passwordHash.value,    // Extract string from HashedPassword  
                user.calorieBudget.value    // Extract number from CalorieBudget
            ]
        );
    }

    /**
     * Find a user by their email address.
     * 
     * @param email - The email to search for (as an EmailAddress value object)
     * @returns The User if found, or null if not found
     */
    async findByEmail(email: EmailAddress): Promise<User | null> {
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
    /**
     * Update a user's daily calorie budget.
     *
     * @param userId - The user's UUID
     * @param calorieBudget - The new CalorieBudget value object (already validated)
     */
    async updateCalorieBudget(userId: string, calorieBudget: CalorieBudget): Promise<void> {
        await this.db.run(
            `UPDATE users SET calorie_budget = ? WHERE id = ?`,
            [calorieBudget.value, userId]
        );
    }

    private mapRowToUser(row: UserRow): User {
        return new User(
            row.id,
            row.first_name,
            row.last_name,
            new EmailAddress(row.email),                // Wrap email string in value object
            new HashedPassword(row.password_hash),   // Wrap hash string in value object
            new CalorieBudget(row.calorie_budget)    // Wrap number in value object
        );
    }
}
