export interface SessionRecord {
    sessionId: string;
    userId: string;
    expiresAt: Date;
}

export interface SessionRepository {
    create(sessionId: string, userId: string, expiresAt: Date): Promise<void>;
    findById(sessionId: string): Promise<SessionRecord | null>;
    delete(sessionId: string): Promise<void>;
    deleteExpired(): Promise<void>;
}
