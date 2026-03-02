import { useEffect, useRef, useState } from "react";

interface EditCalorieBudgetModalProps {
    /** Whether the modal is visible. */
    isOpen: boolean;
    /** The user's current calorie budget (pre-fills the input). */
    currentBudget: number;
    /** Whether the submit request is in-flight (disables buttons). */
    loading: boolean;
    /** Called when the user submits a new calorie budget value. */
    onSubmit: (newBudget: number) => void;
    /** Called when the user cancels (or presses Esc / clicks outside). */
    onCancel: () => void;
}

/**
 * DaisyUI dialog modal for editing the user's daily calorie budget.
 *
 * Uses the native <dialog> element for accessibility (supports Esc key
 * and click-outside to close). Follows the same pattern as DeleteConfirmModal.
 */
export default function EditCalorieBudgetModal({
    isOpen,
    currentBudget,
    loading,
    onSubmit,
    onCancel,
}: EditCalorieBudgetModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [budget, setBudget] = useState(currentBudget);

    // Open / close the native dialog when `isOpen` changes
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    // When the dialog is closed natively (Esc key), notify the parent
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        function handleClose() {
            if (isOpen) onCancel();
        }

        dialog.addEventListener("close", handleClose);
        return () => dialog.removeEventListener("close", handleClose);
    }, [isOpen, onCancel]);

    /** Handle form submission. */
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(budget);
    }

    return (
        <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="text-lg font-bold">Edit Calorie Budget</h3>

                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="label" htmlFor="calorie-budget-input">
                        <span className="label-text">Daily calorie budget (1–7000 kcal)</span>
                    </label>
                    <input
                        id="calorie-budget-input"
                        type="number"
                        min={1}
                        max={7000}
                        step={1}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                        disabled={loading}
                    />

                    {/* Action buttons */}
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner loading-sm" /> : "Save"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Backdrop — click outside to cancel */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
