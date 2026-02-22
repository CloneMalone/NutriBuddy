/**
 * Database Initialization - Creates the database tables if they don't exist.
 * 
 * This function is called when the server starts (in main.ts).
 * It uses "CREATE TABLE IF NOT EXISTS" so it's safe to run multiple times -
 * if the tables already exist, nothing happens.
 */

// Import the database client interface
import { DatabaseClient } from "./DatabaseClient";

/**
 * Initialize all database tables.
 * 
 * @param db - The database client to use for running queries
 */
export async function initializeDatabase(db: DatabaseClient): Promise<void> {

    // Create the users table
    // Stores registered user accounts
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

    // Create the nutrition_logs table
    // Stores food entries logged by users
    await db.run(`
        CREATE TABLE IF NOT EXISTS nutrition_logs (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            calories INTEGER NOT NULL,
            description TEXT NOT NULL,
            emoji_icon TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);

    // Create the sessions table
    // Stores login sessions for authentication
    await db.run(`
        CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            data TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);
    
    // Log success message
    console.log("Database initialized.");
}
