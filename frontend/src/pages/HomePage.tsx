import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import SuccessToast from "../components/SuccessToast";

/**
 * Home page — displays the hero section.
 * Shows a SuccessToast when the user arrives after logging out
 * (message passed via Router state — same pattern as Register → Login).
 */
export default function HomePage() {
    // Read a one-time success message passed via Router state (e.g. after logout)
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState<string | undefined>(
        (location.state as { successMessage?: string })?.successMessage
    );

    /** Clear the toast and scrub Router state so a page refresh won't re-show it. */
    function dismissSuccess() {
        setSuccessMessage(undefined);
        window.history.replaceState({}, document.title);
    }

    return (
        <>
            <NavBar />
            <section className="hero bg-base-200 min-h-[60vh]">
                <Hero />
            </section>
            <SuccessToast message={successMessage} onDismiss={dismissSuccess} />
        </>
    );
}