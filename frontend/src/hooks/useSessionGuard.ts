import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../api/checkSessionApi";

/**
 * Checks whether the user has an active session.
 *
 * - **guard = true** (default): Redirects to /login if the session is invalid.
 *   Use this in authenticated pages (via AuthLayout).
 * - **guard = false**: Redirects to /dashboard if the session IS valid.
 *   Use this in public pages like Login so logged-in users skip them.
 *
 * Returns `checking` — true while the session check is in-flight, so the
 * page can show a FullPageSpinner instead of flashing content.
 */
export function useSessionGuard({ guard = true }: { guard?: boolean } = {}) {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        checkSession()
            .then((result) => {
                if (guard && !result.authenticated) {
                    // Not logged in → send to login
                    navigate("/login");
                } else if (!guard && result.authenticated) {
                    // Already logged in → send to dashboard
                    navigate("/dashboard");
                }
            })
            .catch(() => {
                if (guard) {
                    // Session check failed → assume not authenticated
                    navigate("/login");
                }
            })
            .finally(() => setChecking(false));
    }, [guard, navigate]);

    return { checking };
}
