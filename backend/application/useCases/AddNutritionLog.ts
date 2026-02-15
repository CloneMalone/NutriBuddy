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
        calories: number;
        description: string;
        date: Date;
    }): Promise<void> {
        const entry = new NutritionEntry(input.calories, input.description);

        const log = new NutritionLog(
            input.id,
            input.userId,
            entry,
            input.date
        );

        await this.nutritionLogRepository.save(log);
    }
}
