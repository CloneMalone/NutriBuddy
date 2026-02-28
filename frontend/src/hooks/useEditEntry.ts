import { useCallback, useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNutritionLogById } from "../api/getNutritionLogByIdApi";
import { updateNutritionLog } from "../api/updateNutritionLogApi";

/** Form field names — kept in sync with the input `name` attributes in NutritionLogForm. */
interface EditEntryFormState {
    emojiIcon: string;
    description: string;
    calories: string; // kept as string for the input; parsed to number on submit
    date: string;     // YYYY-MM-DD
}

const EMPTY_STATE: EditEntryFormState = {
    emojiIcon: "",
    description: "",
    calories: "",
    date: "",
};

/**
 * Orchestrates the Edit Entry form state, data fetching, API call, and navigation.
 *
 * On mount   → fetches the existing nutrition log by ID and populates the form.
 * On success → navigates to /dashboard with a success message in Router state.
 * On error   → surfaces the server's validation message for the ErrorToast.
 */
export function useEditEntry() {
    const navigate = useNavigate();
    const { logId } = useParams<{ logId: string }>();

    const [form, setForm] = useState<EditEntryFormState>(EMPTY_STATE);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch the existing log on mount to pre-populate the form
    useEffect(() => {
        if (!logId) return;

        async function fetchLog() {
            try {
                const log = await getNutritionLogById(logId!);

                setForm({
                    emojiIcon: log.emojiIcon,
                    description: log.description,
                    calories: String(log.calories),
                    date: log.date,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load entry");
            } finally {
                setInitialLoading(false);
            }
        }

        fetchLog();
    }, [logId]);

    /** Generic change handler — works for input and select elements via their `name` attribute. */
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    /** Clears the current error — used as the ErrorToast onDismiss callback. */
    const clearError = useCallback(() => setError(null), []);

    /** Submits the updated entry to the backend. */
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!logId) return;

        setError(null);
        setLoading(true);

        try {
            const response = await updateNutritionLog(logId, {
                emojiIcon: form.emojiIcon,
                description: form.description,
                calories: Number(form.calories),
                date: form.date,
            });

            // Navigate back to the dashboard with a success message
            navigate("/dashboard", { state: { successMessage: response.message } });
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { form, initialLoading, loading, error, handleChange, handleSubmit, clearError };
}
