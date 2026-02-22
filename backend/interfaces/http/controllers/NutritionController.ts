/**
 * NutritionController - Handles HTTP requests for nutrition logging.
 * 
 * Provides endpoints for:
 * - Creating new nutrition log entries
 * - Fetching logs for a specific date
 * 
 * All endpoints require authentication (user must be logged in).
 * The session middleware sets req.userId if the user is authenticated.
 */

// Import Express types for request/response handling
import { Request, Response } from "express";

// Import use cases that this controller will call
import { AddNutritionLog } from "../../../application/useCases/AddNutritionLog";
import { GetNutritionLogsByDate } from "../../../application/useCases/GetNutritionLogsByDate";

// Import crypto for generating UUIDs
import { randomUUID } from "crypto";

// Import DomainError to handle validation failures
import { DomainError } from "../../../domain/DomainError";

export class NutritionController {
	constructor(
		// Use case for adding new nutrition entries
		private readonly addNutritionLog: AddNutritionLog,
		
		// Use case for fetching entries by date
		private readonly getNutritionLogsByDate: GetNutritionLogsByDate
	) {}

	/**
	 * Handle POST /api/nutrition
	 * 
	 * Creates a new nutrition log entry for the logged-in user.
	 */
	createLog = async (req: Request, res: Response) => {
		try {
			// Get the user ID from the session (set by session middleware)
			const userId = (req as any).userId as string | undefined;
			
			// If no userId, user is not logged in - return 401 Unauthorized
			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			// Extract nutrition data from request body
			const { calories, description, emojiIcon, date } = req.body;

			// Use provided date or default to today
			const entryDate = date ? new Date(date) : new Date();

			// Call the use case to create the log entry
			await this.addNutritionLog.execute({
				id: randomUUID(),         // Generate unique ID for the log
				userId,                    // Link to the logged-in user
				calories: Number(calories), // Ensure calories is a number
				description: String(description), // Ensure description is a string
				emojiIcon: String(emojiIcon), // Ensure emojiIcon is a string
				date: entryDate
			});

			// Success - return 201 Created
			return res.status(201).json({ message: "Nutrition log created" });
		} catch (err) {
			// If it's a validation error, return 400 Bad Request
			if (err instanceof DomainError) {
				return res.status(400).json({ error: err.message });
			}

			// For unexpected errors, log and return 500 Internal Server Error
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	};

	/**
	 * Handle GET /api/nutrition?date=YYYY-MM-DD
	 * 
	 * Fetches all nutrition logs for the logged-in user on a specific date.
	 * If no date is provided, defaults to today.
	 */
	getLogsByDate = async (req: Request, res: Response) => {
		try {
			// Get the user ID from the session
			const userId = (req as any).userId as string | undefined;
			
			// If no userId, user is not logged in - return 401 Unauthorized
			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			// Get date from query parameters (e.g., /api/nutrition?date=2024-01-15)
			const dateParam = req.query.date as string | undefined;
			
			// Use provided date or default to today
			const date = dateParam ? new Date(dateParam) : new Date();

			// Call the use case to fetch the logs
			const logs = await this.getNutritionLogsByDate.execute({ userId, date });

			// Transform domain entities to simple JSON objects for the response
			// We extract the primitive values from value objects
			const payload = logs.map(l => ({
				id: l.id,
				calories: l.nutritionEntry.calories,
				description: l.nutritionEntry.description,
				emojiIcon: l.nutritionEntry.emojiIcon,
				date: l.date.toISOString().split("T")[0]  // Return date as YYYY-MM-DD string
			}));

			// Success - return 200 OK with the logs
			return res.status(200).json(payload);
		} catch (err) {
			// For any errors, log and return 500 Internal Server Error
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	};
}
