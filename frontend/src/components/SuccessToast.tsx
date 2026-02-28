import Toast from "./Toast";

interface SuccessToastProps {
    message?: string;
    /** Called when the toast auto-dismisses so the parent can clear its success state. */
    onDismiss?: () => void;
}

/** Auto-dismissing success toast with smooth fade-out. */
export default function SuccessToast({ message, onDismiss }: SuccessToastProps) {
    return <Toast message={message} variant="alert-success" onDismiss={onDismiss} />;
}