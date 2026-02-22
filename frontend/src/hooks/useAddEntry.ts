import { useCallback, useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addNutritionLog } from "../api/addNutritionLogApi";

/** Form field names — kept in sync with the input `name` attributes in AddEntryForm. */
interface AddEntryFormState {
    emojiIcon: string;
    description: string;
    calories: string; // kept as string for the input; parsed to number on submit
    date: string;     // YYYY-MM-DD
}

/** Returns today's date as a YYYY-MM-DD string. */
function todayDateString(): string {
    return new Date().toISOString().split("T")[0]!;
}

const INITIAL_STATE: AddEntryFormState = {
    emojiIcon: "",
    description: "",
    calories: "",
    date: todayDateString(),
};

/**
 * Orchestrates the Add Entry form state, API call, and navigation.
 *
 * On success → navigates to /dashboard with a success message in Router state
 *              (same pattern as useRegister → LoginPage).
 * On error  → surfaces the server's validation message for the ErrorToast.
 */
export function useAddEntry() {
    const navigate = useNavigate();

    const [form, setForm] = useState<AddEntryFormState>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    /** Submits the entry to the backend. */
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await addNutritionLog({
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

    return { form, loading, error, handleChange, handleSubmit, clearError };
}