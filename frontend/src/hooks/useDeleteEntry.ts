import { useState } from "react";
import { deleteNutritionLog } from "../api/deleteNutritionLogApi";

/**
 * Hook for deleting a nutrition log entry.
 *
 * Manages loading and error state around the delete API call.
 * Returns the server message on success so the caller can show a toast.
 */
export function useDeleteEntry() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    /** Clear the current error (e.g. when dismissing an error toast). */
    function clearError() {
        setError(undefined);
    }

    /**
     * Delete a nutrition log entry by its ID.
     *
     * @param logId - The ID of the entry to delete
     * @returns The success message from the server, or undefined on failure
     */
    async function deleteEntry(logId: string): Promise<string | undefined> {
        setLoading(true);
        setError(undefined);
        try {
            const response = await deleteNutritionLog(logId);
            return response.message;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete entry");
            return undefined;
        } finally {
            setLoading(false);
        }
    }

    return { deleteEntry, loading, error, clearError };
}
