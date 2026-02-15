// This file contains a function to initialize the database schema. 
// It creates the necessary tables for users and nutrition logs if they don't 
// already exist. This is typically called when the application starts to 
// ensure the database is ready for use.

import { DatabaseClient } from "./DatabaseClient";

export async function initializeDatabase(db: DatabaseClient): Promise<void> {

    // Users table
    await db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            calorie_budget INTEGER NOT NULL
        );
    `);

    // Nutrition logs table
    await db.run(`
        CREATE TABLE IF NOT EXISTS nutrition_logs (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            calories INTEGER NOT NULL,
            description TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);

    // Sessions table for server-side sessions
    await db.run(`
        CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            data TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);
    console.log("Database initialized.");
}
