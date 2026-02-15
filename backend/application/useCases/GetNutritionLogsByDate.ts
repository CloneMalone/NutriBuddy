// Import the repository and entity we need to fetch nutrition data
import { NutritionLogRepository } from "../../domain/repositories/NutritionLogRepository";
import { NutritionLog } from "../../domain/entities/NutritionLog";

export class GetNutritionLogsByDate {
    private readonly nutritionLogRepository: NutritionLogRepository;

    constructor(nutritionLogRepository: NutritionLogRepository) {
        this.nutritionLogRepository = nutritionLogRepository;
    }

    async execute(input: {
        userId: string;
        date: Date;
    }): Promise<NutritionLog[]> {
        return this.nutritionLogRepository.findByUserAndDate(
            input.userId,
            input.date
        );
    }
}
