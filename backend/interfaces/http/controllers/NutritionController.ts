import { Request, Response } from "express";
import { AddNutritionLog } from "../../../application/useCases/AddNutritionLog";
import { GetNutritionLogsByDate } from "../../../application/useCases/GetNutritionLogsByDate";
import { randomUUID } from "crypto";
import { DomainError } from "../../../domain/DomainError";

export class NutritionController {
	constructor(
		private readonly addNutritionLog: AddNutritionLog,
		private readonly getNutritionLogsByDate: GetNutritionLogsByDate
	) {}

	createLog = async (req: Request, res: Response) => {
		try {
			const userId = (req as any).userId as string | undefined;
			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			const { calories, description, date } = req.body;

			const entryDate = date ? new Date(date) : new Date();

			await this.addNutritionLog.execute({
				id: randomUUID(),
				userId,
				calories: Number(calories),
				description: String(description),
				date: entryDate
			});

			return res.status(201).json({ message: "Nutrition log created" });
		} catch (err) {
			if (err instanceof DomainError) {
				return res.status(400).json({ error: err.message });
			}

			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	};

	getLogsByDate = async (req: Request, res: Response) => {
		try {
			const userId = (req as any).userId as string | undefined;
			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			const dateParam = req.query.date as string | undefined;
			const date = dateParam ? new Date(dateParam) : new Date();

			const logs = await this.getNutritionLogsByDate.execute({ userId, date });

			const payload = logs.map(l => ({
				id: l.id,
				calories: l.nutritionEntry.calories,
				description: l.nutritionEntry.description,
				date: l.date.toISOString().split("T")[0]
			}));

			return res.status(200).json(payload);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	};
}
