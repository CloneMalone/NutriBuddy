import { useCallback, useEffect, useState } from "react";
import { getNutritionLogs, type NutritionLogEntry } from "../api/getNutritionLogsApi";
import todayDateString from "../utils/todayDateString";

/**
 * Fetches nutrition logs for a given date and computes caloriesConsumed
 * on the client side by summing each entry's calories.
 *
 * @param date - YYYY-MM-DD string (defaults to today)
 */
export function useNutritionLogs(date: string = todayDateString()) {
    const [entries, setEntries] = useState<NutritionLogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /** Fetch (or re-fetch) logs for the current date. */
    const fetchLogs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const logs = await getNutritionLogs(date);
            setEntries(logs);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load nutrition logs");
        } finally {
            setLoading(false);
        }
    }, [date]);

    // Re-fetch whenever the date changes
    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    // Compute total calories consumed from the entries (frontend calculation)
    const caloriesConsumed = entries.reduce((sum, entry) => sum + entry.calories, 0);

    return { entries, caloriesConsumed, loading, error, refreshLogs: fetchLogs };
}
