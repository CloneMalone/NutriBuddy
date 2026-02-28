import type { NutritionLogEntry } from "./getNutritionLogsApi";

const BASE_URL = "/api";

/**
 * Fetches a single nutrition log entry by its ID.
 * Relies on the session cookie being sent automatically via `credentials: "include"`.
 *
 * @param logId - The ID of the nutrition log to fetch
 * @throws Error with the server-provided message on failure
 */
export async function getNutritionLogById(logId: string): Promise<NutritionLogEntry> {
    const response = await fetch(`${BASE_URL}/nutrition/${encodeURIComponent(logId)}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data as NutritionLogEntry;
}
