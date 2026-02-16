/**
 * DatabaseClient Interface - Defines how we interact with the database.
 * 
 * This is an abstraction layer between our repositories and the actual database.
 * It defines three operations: run (for INSERT/UPDATE/DELETE), get (for single row),
 * and all (for multiple rows).
 * 
 * The actual SQLite implementation lives in sqliteConnection.ts.
 * This abstraction means we could switch to a different database
 * by creating a new implementation of this interface.
 */
export interface DatabaseClient {
    // Execute a query that doesn't return data (INSERT, UPDATE, DELETE)
    run(query: string, params?: unknown[]): Promise<void>;
    
    // Execute a query and return a single row (or undefined if not found)
    get<T>(query: string, params?: unknown[]): Promise<T | undefined>;
    
    // Execute a query and return all matching rows
    all<T>(query: string, params?: unknown[]): Promise<T[]>;
}
