import { useState } from "react";
import { updateCalorieBudget } from "../api/updateCalorieBudgetApi";

/**
 * Hook for updating the authenticated user's calorie budget.
 *
 * Manages loading and error state around the API call.
 * Returns the server message on success so the caller can show a toast.
 */
export function useUpdateCalorieBudget() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    /** Clear the current error (e.g. when dismissing an error toast). */
    function clearError() {
        setError(undefined);
    }

    /**
     * Submit a new calorie budget value.
     *
     * @param calorieBudget - The new daily calorie budget
     * @returns The success message from the server, or undefined on failure
     */
    async function submitCalorieBudget(calorieBudget: number): Promise<string | undefined> {
        setLoading(true);
        setError(undefined);
        try {
            const message = await updateCalorieBudget(calorieBudget);
            return message;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update calorie budget");
            return undefined;
        } finally {
            setLoading(false);
        }
    }

    return { submitCalorieBudget, loading, error, clearError };
}
