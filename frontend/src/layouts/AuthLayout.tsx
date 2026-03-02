import type { ReactNode } from "react";
import AuthNavBar from "../components/AuthNavBar";
import AuthNavDock from "../components/AuthNavDock";
import ErrorToast from "../components/ErrorToast";
import FullPageSpinner from "../components/FullPageSpinner";
import { useLogout } from "../hooks/useLogout";
import { useSessionGuard } from "../hooks/useSessionGuard";
import { useUserProfile } from "../hooks/useUserProfile";

interface AuthLayoutProps {
    children: ReactNode;
}

/**
 * Smart layout wrapper for all authenticated pages.
 * Checks for an active session — redirects to /login if none exists.
 * While checking, renders a FullPageSpinner so the user never sees a
 * flash of the protected content. Also orchestrates the logout flow
 * and renders the shared AuthNavDock.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
    const { checking } = useSessionGuard();           // guard = true (default)
    const { loading, error, clearError, handleLogout } = useLogout();
    const { user } = useUserProfile();

    if (checking) return <FullPageSpinner />;

    return (
        <>
            <AuthNavBar
                firstInitial={user?.firstName[0] ?? ""}
                lastInitial={user?.lastName[0] ?? ""}
                onLogout={handleLogout}
                logoutLoading={loading}
            />
            {children}
            <ErrorToast message={error ?? undefined} onDismiss={clearError} />
            <AuthNavDock />
        </>
    );
}