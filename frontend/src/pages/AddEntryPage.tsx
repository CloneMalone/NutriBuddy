import AuthLayout from "../components/AuthLayout";
import AddEntryForm from "../components/AddEntryForm";
import ErrorToast from "../components/ErrorToast";
import { useAddEntry } from "../hooks/useAddEntry";

/**
 * Smart page — orchestrates the Add Entry form via the useAddEntry hook.
 * Displays an ErrorToast for validation errors from the backend.
 * On success, navigates to /dashboard with a success message in Router state.
 */
export default function AddEntryPage() {
    const { form, loading, error, handleChange, handleSubmit, clearError } = useAddEntry();

    return (
        <AuthLayout>
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <AddEntryForm
                    form={form}
                    loading={loading}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </section>
            <ErrorToast message={error ?? undefined} onDismiss={clearError} />
        </AuthLayout>
    );
}