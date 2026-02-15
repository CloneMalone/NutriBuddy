import { DatabaseClient } from "../database/DatabaseClient";
import { NutritionLog } from "../../domain/entities/NutritionLog";
import { NutritionEntry } from "../../domain/valueObjects/NutritionEntry";
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";

export class SQLiteNutritionLogRepository implements NutritionLogRepository {
	private readonly db: DatabaseClient;

	constructor(db: DatabaseClient) {
		this.db = db;
	}

	private toDateString(date: Date): string {
		return date.toISOString().split("T")[0]!;
	}

	async save(log: NutritionLog): Promise<void> {
		const dateStr = this.toDateString(log.date);

		await this.db.run(
			`INSERT INTO nutrition_logs (id, user_id, calories, description, date) VALUES (?, ?, ?, ?, ?)`,
			[log.id, log.userId, log.nutritionEntry.calories, log.nutritionEntry.description, dateStr]
		);
	}

	async findByUserAndDate(userId: string, date: Date): Promise<NutritionLog[]> {
		const dateStr = this.toDateString(date);

		const rows = await this.db.all<{
			id: string;
			user_id: string;
			calories: number;
			description: string;
			date: string;
		}>(`SELECT * FROM nutrition_logs WHERE user_id = ? AND date = ?`, [userId, dateStr]);

		return rows.map(r => new NutritionLog(r.id, r.user_id, new NutritionEntry(r.calories, r.description), new Date(r.date)));
	}
}
