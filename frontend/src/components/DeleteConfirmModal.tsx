import { useEffect, useRef } from "react";

/** Shape of the entry displayed in the confirmation modal. */
export interface DeleteEntryDetails {
    id: string;
    description: string;
    calories: number;
    emojiIcon: string;
}

interface DeleteConfirmModalProps {
    /** The entry to delete, or null when the modal should be hidden. */
    entry: DeleteEntryDetails | null;
    /** Whether the delete request is in-flight (disables buttons). */
    loading: boolean;
    /** Called when the user confirms deletion. */
    onConfirm: () => void;
    /** Called when the user cancels (or presses Esc / clicks outside). */
    onCancel: () => void;
}

/**
 * DaisyUI dialog modal for confirming entry deletion.
 *
 * Uses the recommended HTML <dialog> approach for accessibility
 * (supports Esc key and click-outside to close).
 * Responsive: slides up from the bottom on mobile, centered on desktop.
 */
export default function DeleteConfirmModal({ entry, loading, onConfirm, onCancel }: DeleteConfirmModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Open / close the native dialog when `entry` changes
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (entry) {
            // Only open if not already open
            if (!dialog.open) dialog.showModal();
        } else {
            dialog.close();
        }
    }, [entry]);

    // When the dialog is closed natively (Esc key), notify the parent
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        function handleClose() {
            // If entry is still set the parent hasn't cleared it yet — treat as cancel
            if (entry) onCancel();
        }

        dialog.addEventListener("close", handleClose);
        return () => dialog.removeEventListener("close", handleClose);
    }, [entry, onCancel]);

    return (
        <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="text-lg font-bold">Are you sure you want to delete this entry?</h3>

                {/* Entry details card */}
                {entry && (
                    <div className="flex items-center gap-4 rounded-box bg-base-200 p-4 mt-4">
                        <span className="text-3xl">{entry.emojiIcon}</span>
                        <div>
                            <p className="font-semibold">{entry.description}</p>
                            <p className="text-sm opacity-60">{entry.calories} calories</p>
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="modal-action">
                    <button
                        className="btn"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-sm" /> : "Delete"}
                    </button>
                </div>
            </div>

            {/* Backdrop — click outside to cancel */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
