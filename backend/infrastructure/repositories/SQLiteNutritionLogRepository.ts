/**
 * SQLiteNutritionLogRepository - Concrete implementation of NutritionLogRepository using SQLite.
 * 
 * Handles storing and retrieving nutrition log entries from the database.
 * Maps between NutritionLog entities and database rows.
 */

// Import database client interface
import { DatabaseClient } from "../database/DatabaseClient";

// Import domain entities and value objects
import { NutritionLog } from "../../domain/entities/NutritionLog";
import { NutritionEntry } from "../../domain/valueObjects/NutritionEntry";

// Import repository interface from domain
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";

export class SQLiteNutritionLogRepository implements NutritionLogRepository {
	// Database client injected through constructor
	private readonly db: DatabaseClient;

	constructor(db: DatabaseClient) {
		this.db = db;
	}

	 /**
     * Convert a Date to YYYY-MM-DD string format for SQLite storage.
     * Uses local time to match how the frontend sends dates.
     */
    private toDateString(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

	/**
	 * Save a new nutrition log entry to the database.
	 * 
	 * @param log - The NutritionLog entity to save
	 */
	async save(log: NutritionLog): Promise<void> {
		// Convert the date to string format
		const dateStr = this.toDateString(log.date);

		// Insert the log, extracting values from the entity and its nested value object
		await this.db.run(
			`INSERT INTO nutrition_logs (id, user_id, calories, description, emoji_icon, date) VALUES (?, ?, ?, ?, ?, ?)`,
			[log.id, log.userId, log.nutritionEntry.calories, log.nutritionEntry.description, log.nutritionEntry.emojiIcon, dateStr]
		);
	}

	/**
	 * Get all nutrition logs for a user on a specific date.
	 * 
	 * @param userId - The user whose logs to fetch
	 * @param date - The date to filter by
	 * @returns Array of NutritionLog entities
	 */
	async findByUserAndDate(userId: string, date: Date): Promise<NutritionLog[]> {
		// Convert date to string format for comparison
		const dateStr = this.toDateString(date);

		// Query for all matching logs
		const rows = await this.db.all<{
			id: string;
			user_id: string;
			calories: number;
			description: string;
			emoji_icon: string;
			date: string;
		}>(`SELECT * FROM nutrition_logs WHERE user_id = ? AND date = ?`, [userId, dateStr]);

		// Convert each row to a NutritionLog entity
		// This involves recreating the NutritionEntry value object
		return rows.map(r => new NutritionLog(
			r.id,
			r.user_id,
			new NutritionEntry(r.calories, r.description, r.emoji_icon),
			new Date(r.date)
		));
	}
}
