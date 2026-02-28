import { useCallback, useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/loginUserApi";

/** All form field names, kept in sync with the input `name` attributes. */
interface LoginFormState {
  email: string;
  password: string;
}

const INITIAL_STATE: LoginFormState = {
  email: "",
  password: "",
};

/** Orchestrates login form state, validation, API call, and navigation.
 * Called exclusively in LoginPage — returns everything the page needs to
 * render the form and display toast feedback.
 * Session checking is handled by useSessionGuard in the page component.
 */
export function useLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Clears the current error — used as the ErrorToast onDismiss callback. */
  const clearError = useCallback(() => setError(null), []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
        await loginUser({
            email: form.email,
            password: form.password,
        });

        // On successful login, navigate to the dashboard
        navigate("/dashboard");
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        }
    } finally {
        setLoading(false);
    }
  }

  // Return everything the LoginPage needs to render the form and display feedback
  return {
    form,
    loading,
    error,
    clearError,
    handleChange,
    handleSubmit,
  };
}
