import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../components/Dashboard";
import DeleteConfirmModal, { type DeleteEntryDetails } from "../components/DeleteConfirmModal";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import { useUserProfile } from "../hooks/useUserProfile";
import { useNutritionLogs } from "../hooks/useNutritionLogs";
import { useDeleteEntry } from "../hooks/useDeleteEntry";
import todayDateString from "../utils/todayDateString";

/**
 * Smart page — fetches the authenticated user's profile and nutrition
 * logs for the selected date. The user can pick any past date via the
 * calendar date picker; future dates are disabled.
 *
 * Displays a SuccessToast when the user arrives after successfully
 * adding an entry (message passed via Router state — same pattern as
 * Register → Login).
 */
export default function DashboardPage() {
    const navigate = useNavigate();
    const today = todayDateString();

    // Selected date for viewing nutrition logs (defaults to today)
    const [selectedDate, setSelectedDate] = useState(today);
    const isToday = selectedDate === today;

    const { user, loading: profileLoading } = useUserProfile();
    const { entries, caloriesConsumed, loading: logsLoading, refreshLogs } = useNutritionLogs(selectedDate);
    const { deleteEntry, loading: deleteLoading, error: deleteError, clearError: clearDeleteError } = useDeleteEntry();

    // Entry currently selected for deletion (null = modal closed)
    const [entryToDelete, setEntryToDelete] = useState<DeleteEntryDetails | null>(null);

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

    /** Called when the user clicks the trash icon on an entry. */
    function handleDeleteClick(entry: DeleteEntryDetails) {
        setEntryToDelete(entry);
    }

    /** Called when the user confirms deletion in the modal. */
    async function handleDeleteConfirm() {
        if (!entryToDelete) return;

        const message = await deleteEntry(entryToDelete.id);
        if (message) {
            setEntryToDelete(null);
            setSuccessMessage(message);
            refreshLogs();
        }
    }

    /** Called when the user cancels or dismisses the delete modal. */
    function handleDeleteCancel() {
        setEntryToDelete(null);
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
                        selectedDate={selectedDate}
                        isToday={isToday}
                        maxDate={today}
                        onDateChange={setSelectedDate}
                        onEntryClick={(id) => navigate(`/edit-entry/${id}`)}
                        onDeleteClick={handleDeleteClick}
                    />
                )}
            </section>
            <SuccessToast message={successMessage} onDismiss={dismissSuccess} />
            <ErrorToast message={deleteError} onDismiss={clearDeleteError} />
            <DeleteConfirmModal
                entry={entryToDelete}
                loading={deleteLoading}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </AuthLayout>
    );
}