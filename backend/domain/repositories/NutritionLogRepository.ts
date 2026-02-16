/**
 * NutritionLogRepository Interface - Defines how we store and retrieve nutrition logs.
 * 
 * This abstraction allows the AddNutritionLog and GetNutritionLogsByDate use cases
 * to work without knowing anything about SQLite or how data is actually stored.
 */

// Import the entity this repository handles
import { NutritionLog } from "../entities/NutritionLog";

export interface NutritionLogRepository {
    // Save a new nutrition log entry to the database
    save(log: NutritionLog): Promise<void>;
    
    // Get all nutrition logs for a specific user on a specific date
    // Used to display the user's daily food diary
    findByUserAndDate(userId: string, date: Date): Promise<NutritionLog[]>;
}
