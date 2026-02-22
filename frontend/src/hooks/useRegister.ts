import { useCallback, useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/registerUserApi";

/** All form field names, kept in sync with the input `name` attributes. */
interface RegisterFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  calorieBudget: string; // kept as string for the input; parsed to number on submit
}

const INITIAL_STATE: RegisterFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  calorieBudget: "",
};

/**
 * Orchestrates registration form state, validation, API call, and navigation.
 * Called exclusively in RegisterPage — returns everything the page needs to
 * render the form and display toast feedback.
 */
export function useRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterFormState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Generic change handler — works for every text/number input via its `name` attribute. */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /** Clears the current error — used as the ErrorToast onDismiss callback. */
  const clearError = useCallback(() => setError(null), []);

  /** Submits the registration form to the backend. */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        calorieBudget: Number(form.calorieBudget),
      });

      // Registration succeeded — navigate to login and pass the success message
      // via Router state so LoginPage can display a SuccessToast.
      navigate("/login", { state: { successMessage: response.message } });
    } catch (err) {
      // Surface the server's domain-error message (or a generic fallback)
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  // Return everything the RegisterPage needs to 
  // render the form and display feedback.
  return { form, error, loading, handleChange, handleSubmit, clearError };
}
