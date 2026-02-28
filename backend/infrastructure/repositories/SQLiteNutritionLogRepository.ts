/**
 * SQLiteNutritionLogRepository - Concrete implementation of NutritionLogRepository using SQLite.
 * 
 * Handles storing and retrieving nutrition log entries from the database.
 * Maps between NutritionLog entities and database rows.
 *
 * Dates are stored and retrieved as plain YYYY-MM-DD strings — no Date
 * objects are used — which eliminates timezone-related date shifting.
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
	 * Save a new nutrition log entry to the database.
	 * 
	 * @param log - The NutritionLog entity to save
	 */
	async save(log: NutritionLog): Promise<void> {
		// Insert the log, extracting values from the entity and its nested value object
		await this.db.run(
			`INSERT INTO nutrition_logs (id, user_id, calories, description, emoji_icon, date) VALUES (?, ?, ?, ?, ?, ?)`,
			[log.id, log.userId, log.nutritionEntry.calories, log.nutritionEntry.description, log.nutritionEntry.emojiIcon, log.date]
		);
	}

	/**
	 * Get all nutrition logs for a user on a specific date.
	 * 
	 * @param userId - The user whose logs to fetch
	 * @param date - YYYY-MM-DD string to filter by
	 * @returns Array of NutritionLog entities
	 */
	async findByUserAndDate(userId: string, date: string): Promise<NutritionLog[]> {
		// Query for all matching logs
		const rows = await this.db.all<{
			id: string;
			user_id: string;
			calories: number;
			description: string;
			emoji_icon: string;
			date: string;
		}>(`SELECT * FROM nutrition_logs WHERE user_id = ? AND date = ?`, [userId, date]);

		// Convert each row to a NutritionLog entity
		// This involves recreating the NutritionEntry value object
		return rows.map(r => new NutritionLog(
			r.id,
			r.user_id,
			new NutritionEntry(r.calories, r.description, r.emoji_icon),
			r.date
		));
	}

	async findByUserAndLogId(userId: string, logId: string): Promise<NutritionLog | null> {
		// Query for the specific log by user ID and log ID
		const row = await this.db.get<{
			id: string;
			user_id: string;
			calories: number;
			description: string;
			emoji_icon: string;
			date: string;
		}>(`SELECT * FROM nutrition_logs WHERE user_id = ? AND id = ?`, [userId, logId]);

		if (!row) {
			return null;
		}

		return new NutritionLog(
			row.id,
			row.user_id,
			new NutritionEntry(row.calories, row.description, row.emoji_icon),
			row.date
		);
	}

	/**
	 * Update an existing nutrition log entry in the database.
	 *
	 * @param log - The NutritionLog entity with updated values
	 */
	async update(log: NutritionLog): Promise<void> {
		await this.db.run(
			`UPDATE nutrition_logs SET calories = ?, description = ?, emoji_icon = ?, date = ? WHERE id = ? AND user_id = ?`,
			[log.nutritionEntry.calories, log.nutritionEntry.description, log.nutritionEntry.emojiIcon, log.date, log.id, log.userId]
		);
	}
}
