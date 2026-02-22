const BASE_URL = "/api";

/** Shape of a single nutrition log entry returned by the backend. */
export interface NutritionLogEntry {
    id: string;
    calories: number;
    description: string;
    emojiIcon: string;
    date: string; // YYYY-MM-DD
}

/**
 * Fetches the authenticated user's nutrition logs for a given date.
 * Relies on the session cookie being sent automatically via `credentials: "include"`.
 *
 * @param date - The date to fetch logs for (YYYY-MM-DD string)
 * @throws Error with the server-provided message on failure
 */
export async function getNutritionLogs(date: string): Promise<NutritionLogEntry[]> {
    const response = await fetch(`${BASE_URL}/nutrition?date=${encodeURIComponent(date)}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    return response.json();
}
