import type { ReactNode } from "react";
import AuthNavBar from "./AuthNavBar";
import AuthNavDock from "./AuthNavDock";
import ErrorToast from "./ErrorToast";
import { useLogout } from "../hooks/useLogout";

interface AuthLayoutProps {
    children: ReactNode;
}

/**
 * Smart layout wrapper for all authenticated pages.
 * Orchestrates the logout flow (useLogout hook) and passes behavior
 * down to the dumb AuthNavBar component. Renders the shared
 * AuthNavDock and logout ErrorToast so individual pages don't have to.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
    const { loading, error, clearError, handleLogout } = useLogout();

    return (
        <>
            <AuthNavBar onLogout={handleLogout} logoutLoading={loading} />
            {children}
            <ErrorToast message={error ?? undefined} onDismiss={clearError} />
            <AuthNavDock />
        </>
    );
}