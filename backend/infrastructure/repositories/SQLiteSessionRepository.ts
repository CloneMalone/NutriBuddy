/**
 * SQLiteSessionRepository - Concrete implementation of SessionRepository using SQLite.
 * 
 * Handles storing and retrieving login sessions from the database.
 * Sessions link a session ID (stored in user's cookie) to a user ID.
 */

// Note: Sessions require full datetime precision (not just date),
// so we use toISOString() instead of the toDateString utility.

// Import database client interface
import { DatabaseClient } from "../database/DatabaseClient";

// Import session repository interface and types from domain
import { SessionRepository, SessionRecord } from "../../domain/repositories/SessionRepository";

export class SQLiteSessionRepository implements SessionRepository {
    // Database client injected through constructor
    private readonly db: DatabaseClient;

    constructor(db: DatabaseClient) {
        this.db = db;
    }

    /**
     * Create a new login session.
     * Called when a user successfully logs in.
     * 
     * @param sessionId - Unique ID for this session (stored in cookie)
     * @param userId - The user who owns this session
     * @param expiresAt - When this session should expire
     */
    async create(sessionId: string, userId: string, expiresAt: Date): Promise<void> {
        // Insert the session, converting the Date to ISO string for SQLite storage
        // Sessions need full datetime precision (hours/minutes/seconds) to expire correctly
        await this.db.run(
            `INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`,
            [sessionId, userId, expiresAt.toISOString()]
        );
    }

    /**
     * Look up a session by its ID.
     * Called by session middleware on every request to verify authentication.
     * 
     * @param sessionId - The session ID from the user's cookie
     * @returns The session record if found, or null if not found
     */
    async findById(sessionId: string): Promise<SessionRecord | null> {
        // Query for the session
        const row = await this.db.get<{ id: string; user_id: string; expires_at: string }>(
            `SELECT id, user_id, expires_at FROM sessions WHERE id = ?`,
            [sessionId]
        );

        // Return null if session not found
        if (!row) return null;

        // Convert database row to SessionRecord object
        // Note: we convert the ISO string back to a Date object
        return {
            sessionId: row.id,
            userId: row.user_id,
            expiresAt: new Date(row.expires_at)
        };
    }

    /**
     * Delete a specific session.
     * Called when a user logs out.
     * 
     * @param sessionId - The session to delete
     */
    async delete(sessionId: string): Promise<void> {
        await this.db.run(`DELETE FROM sessions WHERE id = ?`, [sessionId]);
    }

    /**
     * Delete all sessions belonging to a specific user.
     * Called during login to remove any stale sessions before creating a fresh one.
     * This prevents duplicate sessions from accumulating when a user logs in
     * multiple times without explicitly logging out first.
     * 
     * @param userId - The user whose sessions should be removed
     */
    async deleteByUserId(userId: string): Promise<void> {
        await this.db.run(`DELETE FROM sessions WHERE user_id = ?`, [userId]);
    }

    /**
     * Delete all expired sessions.
     * Can be called periodically to clean up old session data.
     */
    async deleteExpired(): Promise<void> {
        // Delete sessions where expires_at is before the current time
        await this.db.run(`DELETE FROM sessions WHERE expires_at < ?`, [new Date().toISOString()]);
    }
}