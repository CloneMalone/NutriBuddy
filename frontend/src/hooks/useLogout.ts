import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/logoutUserApi";

/**
 * Orchestrates the logout action: API call, loading state, error handling,
 * and navigation. Used by AuthLayout to power the Logout button.
 */
export function useLogout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Clears the current error — used as the ErrorToast onDismiss callback. */
  const clearError = useCallback(() => setError(null), []);

  /** Calls the logout API, then redirects to the home page with a success message. */
  async function handleLogout() {
    setError(null);
    setLoading(true);
    try {
      await logoutUser();

      // On successful logout, navigate to the home page with a success toast message
      navigate("/", { state: { successMessage: "Logged out successfully" } });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // Return everything the layout needs to trigger logout and display feedback
  return {
    loading,
    error,
    clearError,
    handleLogout,
  };
}