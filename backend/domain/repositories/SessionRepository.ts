/**
 * SessionRecord - Data structure representing a user's login session.
 * 
 * Sessions track who is logged in. When a user logs in, we create a session
 * and store the session ID in a cookie. On subsequent requests, we look up
 * the session to identify the user without requiring them to log in again.
 */
export interface SessionRecord {
    // Unique identifier for this session (stored in the user's cookie)
    sessionId: string;
    
    // The user who owns this session
    userId: string;
    
    // When this session expires (after this time, user must log in again)
    expiresAt: Date;
}

/**
 * SessionRepository Interface - Defines how we store and manage login sessions.
 * 
 * Like UserRepository, this is an abstraction. The actual storage (SQLite)
 * is handled by SQLiteSessionRepository in the Infrastructure layer.
 */
export interface SessionRepository {
    // Create a new session when user logs in
    create(sessionId: string, userId: string, expiresAt: Date): Promise<void>;
    
    // Look up a session by its ID (to verify if user is logged in)
    // Returns null if session doesn't exist
    findById(sessionId: string): Promise<SessionRecord | null>;
    
    // Delete a specific session (used for logout)
    delete(sessionId: string): Promise<void>;
    
    // Delete all sessions belonging to a specific user
    // Used during login to prevent duplicate sessions from accumulating
    deleteByUserId(userId: string): Promise<void>;
    
    // Clean up old sessions that have passed their expiration date
    deleteExpired(): Promise<void>;
}