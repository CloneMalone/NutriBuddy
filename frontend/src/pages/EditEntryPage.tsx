import AuthLayout from "../layouts/AuthLayout";
import NutritionLogForm from "../components/NutritionLogForm";
import ErrorToast from "../components/ErrorToast";
import { useEditEntry } from "../hooks/useEditEntry";

/**
 * Smart page — orchestrates the Edit Entry form via the useEditEntry hook.
 * Fetches the existing log on mount, pre-populates the form, and submits
 * a PUT request on save. Displays an ErrorToast for validation errors.
 * On success, navigates to /dashboard with a success message in Router state.
 */
export default function EditEntryPage() {
    const { form, initialLoading, loading, error, handleChange, handleSubmit, clearError } = useEditEntry();

    return (
        <AuthLayout>
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                {initialLoading ? (
                    <div className="flex w-52 flex-col gap-4 m-auto">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ) : (
                    <NutritionLogForm
                        form={form}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        title="✏️ Edit Food Entry"
                        submitLabel="Save Changes"
                    />
                )}
            </section>
            <ErrorToast message={error ?? undefined} onDismiss={clearError} />
        </AuthLayout>
    );
}
