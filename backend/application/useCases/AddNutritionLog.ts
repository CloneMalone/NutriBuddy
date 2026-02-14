import { NutritionLog } from "../../domain/entities/NutritionLog";
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";
import { NutritionEntry } from "../../domain/valueObjects/NutritionEntry";

export class AddNutritionLog {
    private readonly nutritionLogRepository: NutritionLogRepository;

    constructor(nutritionLogRepository: NutritionLogRepository) {
        this.nutritionLogRepository = nutritionLogRepository;
    }


    async execute(input: {
        id: string;
        userId: string;
        nutritionEntry: NutritionEntry;
        date: Date;
    }): Promise<void> {
        const log = new NutritionLog(
            input.id,
            input.userId,
            input.nutritionEntry,
            input.date
        );

        await this.nutritionLogRepository.save(log);
    }
}
