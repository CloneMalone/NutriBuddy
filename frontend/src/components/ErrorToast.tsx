import { useEffect } from "react";

interface ErrorToastProps {
    message?: string;
    /** Called when the toast auto-dismisses so the parent can clear its error state. */
    onDismiss?: () => void;
}

/** Auto-dismissing error toast — disappears after 5 seconds. */
export default function ErrorToast({ message, onDismiss }: ErrorToastProps) {
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
                <div className="toast mb-20">
                    <div className="alert alert-error">
                        <span>{message}</span>
                    </div>
                </div>
            )}
        </>
    );
}