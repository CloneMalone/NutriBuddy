// Import the entity this repository handles
import { NutritionEntry } from "../entities/NutritionEntry";

// This interface defines the contract for saving and retrieving nutrition entries
// Any class that implements this interface must provide these methods
export interface NutritionEntryRepository {
    // Save a nutrition entry to the database
    save(entry: NutritionEntry): Promise<void>;
    // Find and return all nutrition entries for a specific user on a specific date
    findByUserAndDate(userId: string, date: Date): Promise<NutritionEntry[]>;
}
