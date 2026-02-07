// These imports bring in the tools we need to create and save nutrition entries
import { NutritionEntryRepository } from "../../domain/repositories/NutritionEntryRepository";
import { NutritionEntry } from "../../domain/entities/NutritionEntry";
import { Calories } from "../../domain/valueObjects/Calories";
import { CaloriesDescription } from "../../domain/valueObjects/CaloriesDescription";

// This class handles the business logic for adding a new nutrition entry
export class AddNutritionEntry {
    // Store a reference to the repository so we can save nutrition entries to the database
    private readonly nutritionEntryRepository: NutritionEntryRepository;

    // Constructor receives the repository when the class is created
    constructor(nutritionEntryRepository: NutritionEntryRepository) {
        this.nutritionEntryRepository = nutritionEntryRepository;
    }

    // Main method that creates and saves a nutrition entry
    async execute(input: {
        id: string;
        userId: string;
        calories: number;
        description: string;
        date: Date;
    }): Promise<void> {
        // Create a new nutrition entry by wrapping the input data in value objects
        // This ensures the data is validated before being saved
        const entry = new NutritionEntry(
            input.id,
            input.userId,
            new Calories(input.calories), // Validates that calories is positive
            new CaloriesDescription(input.description), // Validates that description isn't empty
            input.date
        );

        // Save the validated entry to the database
        await this.nutritionEntryRepository.save(entry);
    }
}
