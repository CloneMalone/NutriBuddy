// Import the entity this repository handles
import { NutritionEntry } from "../entities/NutritionEntry";

export interface NutritionEntryRepository {
    save(entry: NutritionEntry): Promise<void>;
    findByUserAndDate(userId: string, date: Date): Promise<NutritionEntry[]>;
}
