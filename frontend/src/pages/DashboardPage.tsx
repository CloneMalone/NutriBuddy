import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
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
    const navigate = useNavigate();
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

    const loading = profileLoading || logsLoading;

    return (
        <AuthLayout>
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex flex-col">
                {loading ? (
                    <div className="container flex flex-col gap-6 p-6 mx-auto pb-30">
                        <div className="flex w-52 flex-col gap-4">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </div>
                ) : (
                    <Dashboard
                        firstName={user?.firstName ?? ""}
                        calorieBudget={user?.calorieBudget ?? 0}
                        caloriesConsumed={caloriesConsumed}
                        entries={entries}
                        onEntryClick={(id) => navigate(`/edit-entry/${id}`)}
                    />
                )}
            </section>
            <SuccessToast message={successMessage} onDismiss={dismissSuccess} />
        </AuthLayout>
    );
}