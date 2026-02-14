// This file defines a simple interface for database operations 
// that our repositories can use.
export interface DatabaseClient {
    run(query: string, params?: unknown[]): Promise<void>;
    get<T>(query: string, params?: unknown[]): Promise<T | undefined>;
    all<T>(query: string, params?: unknown[]): Promise<T[]>;
}
