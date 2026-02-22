const BASE_URL = "/api";

/** Shape of the request body for POST /api/nutrition */
export interface AddNutritionLogPayload {
    calories: number;
    description: string;
    emojiIcon: string;
    date: string; // YYYY-MM-DD
}

/** Shape of a successful response from POST /api/nutrition */
interface AddNutritionLogResponse {
    message: string;
}

/**
 * Sends a new nutrition log entry to the backend.
 * Relies on the session cookie being sent automatically via `credentials: "include"`.
 *
 * @throws Error with the server-provided validation message on failure
 */
export async function addNutritionLog(
    payload: AddNutritionLogPayload
): Promise<AddNutritionLogResponse> {
    const response = await fetch(`${BASE_URL}/nutrition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    return response.json();
}