import { useEffect, useState } from "react";

interface ToastProps {
    message?: string;
    /** Alert style variant — maps to DaisyUI alert classes. */
    variant: "alert-success" | "alert-error";
    /** Called after the toast finishes its fade-out animation. */
    onDismiss?: () => void;
}

/** Duration the toast stays fully visible (ms). */
const DISPLAY_DURATION = 5000;
/** Duration of the fade-out transition (ms) — must match the CSS transition below. */
const FADE_DURATION = 300;

/**
 * Reusable auto-dismissing toast with smooth enter and exit animations.
 *
 * Flow: message appears → fade-in → visible for DISPLAY_DURATION →
 * fade-out over FADE_DURATION → onDismiss callback fires.
 */
export default function Toast({ message, variant, onDismiss }: ToastProps) {
    /** Controls the opacity transition (false = transparent, true = opaque). */
    const [visible, setVisible] = useState(false);
    /** Preserves the message text while the toast is fading out. */
    const [displayedMessage, setDisplayedMessage] = useState(message);

    // Capture each new message so the text persists during the fade-out
    if (message && message !== displayedMessage) {
        setDisplayedMessage(message);
    }

    useEffect(() => {
        if (!message) return;

        // Fade in on the next animation frame so the browser registers opacity 0 first
        const enterFrame = requestAnimationFrame(() => setVisible(true));

        // Begin the fade-out after the display duration
        const hideTimer = setTimeout(() => setVisible(false), DISPLAY_DURATION);

        // Clear the displayed message and notify the parent after the fade-out finishes
        const removeTimer = setTimeout(() => {
            setDisplayedMessage(undefined);
            onDismiss?.();
        }, DISPLAY_DURATION + FADE_DURATION);

        return () => {
            cancelAnimationFrame(enterFrame);
            clearTimeout(hideTimer);
            clearTimeout(removeTimer);
        };
    }, [message, onDismiss]);

    // Only render while there's a message to show or the toast is still fading out
    if (!displayedMessage && !visible) return null;

    return (
        <div
            className="toast mb-20 transition-opacity duration-300 ease-in-out"
            style={{ opacity: visible ? 1 : 0 }}
        >
            <div className={`alert ${variant}`}>
                <span>{displayedMessage}</span>
            </div>
        </div>
    );
}
