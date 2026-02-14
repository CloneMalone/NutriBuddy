// This file sets up a connection to a SQLite database and 
// implements the DatabaseClient interface defined in DatabaseClient.ts.
// It uses the sqlite3 library to interact with the database and provides
// methods for running queries and fetching results.

import sqlite3 from "sqlite3";
import path from "path";
import { DatabaseClient } from "./DatabaseClient";

// Enable verbose mode for better debugging output from sqlite3
sqlite3.verbose();

const dbPath = path.resolve(__dirname, "../../database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to connect to SQLite database:", err);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Implement the DatabaseClient interface using sqlite3
// This object will be used by our repositories to perform database operations.
export const sqliteConnection: DatabaseClient = {
    run(query: string, params: unknown[] = []): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    get<T>(query: string, params: unknown[] = []): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            db.get(query, params, (err, row) => {
                if (err) reject(err);
                else resolve(row as T | undefined);
            });
        });
    },

    all<T>(query: string, params: unknown[] = []): Promise<T[]> {
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows as T[]);
            });
        });
    }
};
