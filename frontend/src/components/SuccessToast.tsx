import { useEffect } from "react";

interface SuccessToastProps {
    message?: string;
    /** Called when the toast auto-dismisses so the parent can clear its success state. */
    onDismiss?: () => void;
}

/** Auto-dismissing success toast — disappears after 5 seconds. */
export default function SuccessToast({ message, onDismiss }: SuccessToastProps) {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            onDismiss?.();
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onDismiss]);

    return (
        <>
            {message && (
                <div className="toast">
                    <div className="alert alert-success">
                        <span>{message}</span>
                    </div>
                </div>
            )}
        </>
    );
}