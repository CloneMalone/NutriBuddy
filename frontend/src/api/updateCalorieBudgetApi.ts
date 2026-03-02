const BASE_URL = "/api";

// The shape of the successful response from the server when updating calorie budget
interface UpdateCalorieBudgetResponse {
    message: string;
}

/**
 * Sends a PUT request to update the authenticated user's calorie budget.
 *
 * @param calorieBudget - The new daily calorie budget
 * @returns The success message from the server
 * @throws Error with the server-provided message on failure
 */
export async function updateCalorieBudget(calorieBudget: number): Promise<string> {
    const response = await fetch(`${BASE_URL}/users/me/calorie-budget`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ calorieBudget }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to update calorie budget");
    }

    return data.message as UpdateCalorieBudgetResponse["message"];
}
