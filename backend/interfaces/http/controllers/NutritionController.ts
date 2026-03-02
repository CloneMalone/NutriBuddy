/**
 * NutritionController - Handles HTTP requests for nutrition logging.
 * 
 * Provides endpoints for:
 * - Creating new nutrition log entries
 * - Fetching logs for a specific date
 * 
 * All endpoints require authentication (user must be logged in).
 * The session middleware sets req.userId if the user is authenticated.
 *
 * Dates are kept as plain YYYY-MM-DD strings throughout — no Date
 * objects are used — which eliminates timezone-related date shifting.
 */

// Import Local Date conversion utility (used only for "default to today")
import toDateString from "../../../utils/ToDateString";

// Import Express types for request/response handling
import { Request, Response } from "express";

// Import use cases that this controller will call
import { AddNutritionLog } from "../../../application/useCases/AddNutritionLog";
import { GetNutritionLogsByDate } from "../../../application/useCases/GetNutritionLogsByDate";
import { GetNutritionLogById } from "../../../application/useCases/GetNutritionLogById";
import { UpdateNutritionLog } from "../../../application/useCases/UpdateNutritionLog";
import { DeleteNutritionLog } from "../../../application/useCases/DeleteNutritionLog";

// Import crypto for generating UUIDs
import { randomUUID } from "crypto";

// Import DomainError to handle validation failures
import { DomainError } from "../../../domain/DomainError";

export class NutritionController {
	constructor(
		// Use case for adding new nutrition entries
		private readonly addNutritionLog: AddNutritionLog,
		
		// Use case for fetching entries by date
		private readonly getNutritionLogsByDate: GetNutritionLogsByDate,
		
		// Use case for fetching a specific log by ID
		private readonly getNutritionLogById: GetNutritionLogById,

		// Use case for updating an existing nutrition log
		private readonly updateNutritionLog: UpdateNutritionLog,

		// Use case for deleting an existing nutrition log
		private readonly deleteNutritionLog: DeleteNutritionLog
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

			// Use provided YYYY-MM-DD string or default to today
			const entryDate: string = date || toDateString(new Date());

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
			
			// Use provided YYYY-MM-DD string or default to today
			const date: string = dateParam || toDateString(new Date());

			// Call the use case to fetch the logs
			const logs = await this.getNutritionLogsByDate.execute({ userId, date });

			// Transform domain entities to simple JSON objects for the response
			// We extract the primitive values from value objects
			const payload = logs.map(l => ({
				id: l.id,
				calories: l.nutritionEntry.calories,
				description: l.nutritionEntry.description,
				emojiIcon: l.nutritionEntry.emojiIcon,
				date: l.date  // Already a YYYY-MM-DD string
			}));

			// Success - return 200 OK with the logs
			return res.status(200).json(payload);
		} catch (err) {
			// For any errors, log and return 500 Internal Server Error
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	};

	/**
	 * Handle GET /api/nutrition/:logId
	 *
	 * Fetches a specific nutrition log by its ID for the logged-in user.
	 */
	getLogById = async (req: Request, res: Response) => {
		try {
			// Get the user ID from the session
			const userId = (req as any).userId as string | undefined;
			
			// If no userId, user is not logged in - return 401 Unauthorized
			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			// Get log ID from route parameters
			const logId = req.params.logId as string | undefined;

			// If no logId, return 400 Bad Request
			if (!logId) {
				return res.status(400).json({ error: "Log ID is required" });
			}

			// Call the use case to fetch the log
			const log = await this.getNutritionLogById.execute({ userId, logId });

			// If log not found, return 404 Not Found
			if (!log) {
				return res.status(404).json({ error: "Nutrition log not found" });
			}

			// Transform domain entity to simple JSON object for the response
			const payload = {
				id: log.id,
				calories: log.nutritionEntry.calories,
				description: log.nutritionEntry.description,
				emojiIcon: log.nutritionEntry.emojiIcon,
				date: log.date  // Already a YYYY-MM-DD string
			};

			// Success - return 200 OK with the log
			return res.status(200).json(payload);
		} catch (err) {
			// For any errors, log and return 500 Internal Server Error
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	};

	/**
	 * Handle PUT /api/nutrition/:logId
	 *
	 * Updates an existing nutrition log entry for the logged-in user.
	 */
	updateLog = async (req: Request, res: Response) => {
		try {
			// Get the user ID from the session
			const userId = (req as any).userId as string | undefined;

			// If no userId, user is not logged in - return 401 Unauthorized
			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			// Get log ID from route parameters
			const logId = req.params.logId as string | undefined;

			// If no logId, return 400 Bad Request
			if (!logId) {
				return res.status(400).json({ error: "Log ID is required" });
			}

			// Extract updated nutrition data from request body
			const { calories, description, emojiIcon, date } = req.body;

			// Use provided YYYY-MM-DD string or default to today
			const entryDate: string = date || toDateString(new Date());

			// Call the use case to update the log entry
			await this.updateNutritionLog.execute({
				id: logId,
				userId,
				calories: Number(calories),
				description: String(description),
				emojiIcon: String(emojiIcon),
				date: entryDate
			});

			// Success - return 200 OK
			return res.status(200).json({ message: "Nutrition log updated" });
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
	 * Handle DELETE /api/nutrition/:logId
	 *
	 * Deletes an existing nutrition log entry for the logged-in user.
	 */
	deleteLog = async (req: Request, res: Response) => {
		try {
			// Get the user ID from the session
			const userId = (req as any).userId as string | undefined;

			// If no userId, user is not logged in - return 401 Unauthorized
			if (!userId) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			// Get log ID from route parameters
			const logId = req.params.logId as string | undefined;

			// If no logId, return 400 Bad Request
			if (!logId) {
				return res.status(400).json({ error: "Log ID is required" });
			}

			// Call the use case to delete the log entry
			await this.deleteNutritionLog.execute({ userId, logId });

			// Success - return 200 OK
			return res.status(200).json({ message: "Nutrition log deleted" });
		} catch (err) {
			// If it's a domain error (e.g. log not found), return 400 Bad Request
			if (err instanceof DomainError) {
				return res.status(400).json({ error: err.message });
			}

			// For unexpected errors, log and return 500 Internal Server Error
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	};
}
