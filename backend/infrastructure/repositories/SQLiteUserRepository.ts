// This file implements the UserRepository interface using SQLite as the storage mechanism.
// It uses the DatabaseClient interface to perform database operations, and maps
// between the User entity and the database rows.

// This is important because it allows us to keep our domain logic separate from the 
// details of how we store data, and makes it easier to swap out the database 
// implementation in the future if needed.

import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { UserPassword } from "../../domain/valueObjects/UserPassword";
import { UserCalorieBudget } from "../../domain/valueObjects/UserCalorieBudget";
import { DatabaseClient } from "../database/DatabaseClient";

interface UserRow {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    calorie_budget: number;
}

export class SQLiteUserRepository implements UserRepository {
    constructor(private readonly db: DatabaseClient) {}

    async save(user: User): Promise<void> {
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
                user.email.value,
                user.passwordHash.value,
                user.calorieBudget.value
            ]
        );
    }

    async findByEmail(email: UserEmail): Promise<User | null> {
        const row = await this.db.get<UserRow>(
            `
            SELECT * FROM users
            WHERE email = ?
            `,
            [email.value]
        );

        if (!row) return null;

        return this.mapRowToUser(row);
    }

    async findById(id: string): Promise<User | null> {
        const row = await this.db.get<UserRow>(
            `
            SELECT * FROM users
            WHERE id = ?
            `,
            [id]
        );

        if (!row) return null;

        return this.mapRowToUser(row);
    }

    private mapRowToUser(row: UserRow): User {
        return new User(
            row.id,
            row.first_name,
            row.last_name,
            new UserEmail(row.email),
            new UserPassword(row.password_hash),
            new UserCalorieBudget(row.calorie_budget)
        );
    }
}
