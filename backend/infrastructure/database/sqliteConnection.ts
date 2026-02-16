/**
 * SQLite Connection - Concrete implementation of the DatabaseClient interface.
 * 
 * This file creates the actual connection to SQLite and provides methods
 * for running queries. The sqlite3 library uses callbacks, so we wrap
 * everything in Promises for easier async/await usage.
 * 
 * The database file is stored at backend/database.sqlite.
 */

// Import the sqlite3 library for database operations
import sqlite3 from "sqlite3";

// Import Node's path module to build the database file path
import path from "path";

// Import our DatabaseClient interface
import { DatabaseClient } from "./DatabaseClient";

// Enable verbose mode for better debugging output from sqlite3
sqlite3.verbose();

// Build the absolute path to the database file
// __dirname is the current directory, "../../database.sqlite" goes up to backend/
const dbPath = path.resolve(__dirname, "../../database.sqlite");

// Create the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        // Log connection failure
        console.error("Failed to connect to SQLite database:", err);
    } else {
        // Log successful connection
        console.log("Connected to SQLite database.");
    }
});

/**
 * SQLite implementation of the DatabaseClient interface.
 * 
 * Each method wraps sqlite3's callback-based API in a Promise.
 */
export const sqliteConnection: DatabaseClient = {
    /**
     * Run a query that doesn't return data (INSERT, UPDATE, DELETE).
     * 
     * @param query - SQL query string with ? placeholders
     * @param params - Values to substitute for ? placeholders
     */
    run(query: string, params: unknown[] = []): Promise<void> {
        return new Promise((resolve, reject) => {
            // db.run executes the query and calls the callback when done
            db.run(query, params, function (err) {
                if (err) reject(err);  // Query failed
                else resolve();         // Query succeeded
            });
        });
    },

    /**
     * Run a query and return a single row.
     * 
     * @param query - SQL SELECT query
     * @param params - Values to substitute for ? placeholders
     * @returns The first matching row, or undefined if none found
     */
    get<T>(query: string, params: unknown[] = []): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            // db.get returns only the first matching row
            db.get(query, params, (err, row) => {
                if (err) reject(err);              // Query failed
                else resolve(row as T | undefined); // Return the row
            });
        });
    },

    /**
     * Run a query and return all matching rows.
     * 
     * @param query - SQL SELECT query
     * @param params - Values to substitute for ? placeholders
     * @returns Array of all matching rows
     */
    all<T>(query: string, params: unknown[] = []): Promise<T[]> {
        return new Promise((resolve, reject) => {
            // db.all returns all matching rows as an array
            db.all(query, params, (err, rows) => {
                if (err) reject(err);       // Query failed
                else resolve(rows as T[]);  // Return all rows
            });
        });
    }
};
