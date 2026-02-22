import NavBar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";
import ErrorToast from "../components/ErrorToast";
import { useRegister } from "../hooks/useRegister";

/**
 * Smart page component — owns all state via the useRegister hook
 * and passes props down to the presentational RegisterForm.
 */
export default function RegisterPage() {
    const { form, error, loading, handleChange, handleSubmit, clearError } = useRegister();

    return (
        <>
            <NavBar />
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <RegisterForm
                    form={form}
                    loading={loading}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </section>
            <ErrorToast message={error ?? undefined} onDismiss={clearError} />
        </>
    );
}