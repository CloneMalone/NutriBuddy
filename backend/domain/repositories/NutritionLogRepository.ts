// Import the entity this repository handles
import { NutritionLog } from "../entities/NutritionLog";

export interface NutritionLogRepository {
    save(log: NutritionLog): Promise<void>;
    findByUserAndDate(userId: string, date: Date): Promise<NutritionLog[]>;
}
