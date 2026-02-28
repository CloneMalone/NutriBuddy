import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import FullPageSpinner from "../components/FullPageSpinner";
import { useLogin } from "../hooks/useLogin";
import { useSessionGuard } from "../hooks/useSessionGuard";

/**
 * Smart page component — displays a SuccessToast when the user arrives
 * after a successful registration (message passed via Router state).
 * If the user already has a valid session, redirects to /dashboard.
 */
export default function LoginPage() {
    const { checking } = useSessionGuard({ guard: false });  // redirect to /dashboard if logged in
    const { form, loading, error, clearError, handleChange, handleSubmit } = useLogin();

    // Read a one-time success message passed via Router state (e.g. after registration)
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState<string | undefined>(
        (location.state as { successMessage?: string })?.successMessage
    );

    /** Clear the toast and scrub Router state so a page refresh won't re-show it. */
    function dismissSuccess() {
        setSuccessMessage(undefined);
        window.history.replaceState({}, document.title);
    }

    if (checking) return <FullPageSpinner />;

    return (
        <>
            <NavBar />
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <LoginForm form={form} loading={loading} onChange={handleChange} onSubmit={handleSubmit} />
            </section>
            <SuccessToast message={successMessage} onDismiss={dismissSuccess} />
            <ErrorToast message={error ?? undefined} onDismiss={clearError} />
        </>
    );
}