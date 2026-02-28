import type { AddNutritionLogPayload } from "./addNutritionLogApi";

const BASE_URL = "/api";

/** Shape of a successful response from PUT /api/nutrition/:logId */
interface UpdateNutritionLogResponse {
    message: string;
}

/**
 * Sends an update request for an existing nutrition log entry.
 * Relies on the session cookie being sent automatically via `credentials: "include"`.
 *
 * @param logId   - The ID of the nutrition log to update
 * @param payload - The updated nutrition data
 * @throws Error with the server-provided validation message on failure
 */
export async function updateNutritionLog(
    logId: string,
    payload: AddNutritionLogPayload
): Promise<UpdateNutritionLogResponse> {
    const response = await fetch(`${BASE_URL}/nutrition/${encodeURIComponent(logId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data as UpdateNutritionLogResponse;
}
