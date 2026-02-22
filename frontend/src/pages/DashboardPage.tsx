import { useState } from "react";
import { useLocation } from "react-router-dom";
import AuthNavBar from "../components/AuthNavBar";
import AuthNavDock from "../components/AuthNavDock";
import Dashboard from "../components/Dashboard";
import SuccessToast from "../components/SuccessToast";
import { useUserProfile } from "../hooks/useUserProfile";
import { useNutritionLogs } from "../hooks/useNutritionLogs";

/**
 * Smart page — fetches the authenticated user's profile and today's
 * nutrition logs. Displays a SuccessToast when the user arrives after
 * successfully adding an entry (message passed via Router state —
 * same pattern as Register → Login).
 */
export default function DashboardPage() {
    const { user, loading: profileLoading } = useUserProfile();
    const { entries, caloriesConsumed, loading: logsLoading } = useNutritionLogs();

    // Read a one-time success message passed via Router state (e.g. after adding an entry)
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState<string | undefined>(
        (location.state as { successMessage?: string })?.successMessage
    );

    /** Clear the toast and scrub Router state so a page refresh won't re-show it. */
    function dismissSuccess() {
        setSuccessMessage(undefined);
        window.history.replaceState({}, document.title);
    }

    return (
        <>
            <AuthNavBar />
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex flex-col">
                <Dashboard
                    firstName={user?.firstName ?? ""}
                    calorieBudget={user?.calorieBudget ?? 0}
                    caloriesConsumed={caloriesConsumed}
                    entries={entries}
                    loading={profileLoading || logsLoading}
                />
            </section>
            <SuccessToast message={successMessage} onDismiss={dismissSuccess} />
            <AuthNavDock />
        </>
    );
}