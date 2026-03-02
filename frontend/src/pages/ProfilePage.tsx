import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import ProfilePageAvatar from "../components/ProfilePageAvatar";
import ProfilePageData from "../components/ProfilePageData";
import EditCalorieBudgetModal from "../components/EditCalorieBudgetModal";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUpdateCalorieBudget } from "../hooks/useUpdateCalorieBudget";

/**
 * Smart page — fetches the authenticated user's profile and orchestrates
 * the calorie-budget edit modal, mutation hook, and toast feedback.
 */
export default function ProfilePage() {
    const { user, loading, refreshProfile } = useUserProfile();
    const { submitCalorieBudget, loading: budgetLoading, error: budgetError, clearError } = useUpdateCalorieBudget();

    // Modal open/close state
    const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);

    // Toast message (shown after a successful budget update)
    const [successMessage, setSuccessMessage] = useState<string | undefined>();

    /** Called when the user submits a new budget from the modal. */
    async function handleBudgetSubmit(newBudget: number) {
        const message = await submitCalorieBudget(newBudget);
        if (message) {
            setIsEditBudgetOpen(false);
            setSuccessMessage(message);
            refreshProfile();
        }
    }

    return (
        <AuthLayout>
            {loading ? (
                <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-center justify-center">
                    <div className="flex w-52 flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-20"></div>
                                <div className="skeleton h-4 w-28"></div>
                            </div>
                        </div>
                        <div className="skeleton h-32 w-full"></div>
                    </div>
                </section>
            ) : (
                <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex flex-col items-center justify-center">
                    <ProfilePageAvatar
                        firstName={user?.firstName ?? ""}
                        lastName={user?.lastName ?? ""}
                        firstInitial={user?.firstName[0] ?? ""}
                        lastInitial={user?.lastName[0] ?? ""}
                    />
                    <ProfilePageData
                        email={user?.email ?? ""}
                        calorieBudget={user?.calorieBudget ?? 0}
                        onEditBudget={() => setIsEditBudgetOpen(true)}
                    />
                </section>
            )}

            {/* Edit calorie budget modal — key forces remount so input resets after save */}
            <EditCalorieBudgetModal
                key={user?.calorieBudget}
                isOpen={isEditBudgetOpen}
                currentBudget={user?.calorieBudget ?? 0}
                loading={budgetLoading}
                onSubmit={handleBudgetSubmit}
                onCancel={() => setIsEditBudgetOpen(false)}
            />

            {/* Toasts */}
            <SuccessToast message={successMessage} onDismiss={() => setSuccessMessage(undefined)} />
            <ErrorToast message={budgetError} onDismiss={clearError} />
        </AuthLayout>
    );
}