import Toast from "./Toast";

interface ErrorToastProps {
    message?: string;
    /** Called when the toast auto-dismisses so the parent can clear its error state. */
    onDismiss?: () => void;
}

/** Auto-dismissing error toast with smooth fade-out. */
export default function ErrorToast({ message, onDismiss }: ErrorToastProps) {
    return <Toast message={message} variant="alert-error" onDismiss={onDismiss} />;
}