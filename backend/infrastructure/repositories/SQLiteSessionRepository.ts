import { DatabaseClient } from "../database/DatabaseClient";
import { SessionRepository, SessionRecord } from "../../domain/repositories/SessionRepository";

export class SQLiteSessionRepository implements SessionRepository {
	private readonly db: DatabaseClient;

	constructor(db: DatabaseClient) {
		this.db = db;
	}

	async create(sessionId: string, userId: string, expiresAt: Date): Promise<void> {
		await this.db.run(
			`INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`,
			[sessionId, userId, expiresAt.toISOString()]
		);
	}

	async findById(sessionId: string): Promise<SessionRecord | null> {
		const row = await this.db.get<{ id: string; user_id: string; expires_at: string }>(
			`SELECT id, user_id, expires_at FROM sessions WHERE id = ?`,
			[sessionId]
		);

		if (!row) return null;

		return {
			sessionId: row.id,
			userId: row.user_id,
			expiresAt: new Date(row.expires_at)
		};
	}

	async delete(sessionId: string): Promise<void> {
		await this.db.run(`DELETE FROM sessions WHERE id = ?`, [sessionId]);
	}

	async deleteExpired(): Promise<void> {
		await this.db.run(`DELETE FROM sessions WHERE expires_at < ?`, [new Date().toISOString()]);
	}
}
