const BASE_URL = "/api";

/** Shape of a successful response from DELETE /api/nutrition/:logId */
interface DeleteNutritionLogResponse {
    message: string;
}

/**
 * Sends a delete request for an existing nutrition log entry.
 * Relies on the session cookie being sent automatically via `credentials: "include"`.
 *
 * @param logId - The ID of the nutrition log to delete
 * @throws Error with the server-provided message on failure
 */
export async function deleteNutritionLog(
    logId: string
): Promise<DeleteNutritionLogResponse> {
    const response = await fetch(`${BASE_URL}/nutrition/${encodeURIComponent(logId)}`, {
        method: "DELETE",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data as DeleteNutritionLogResponse;
}
