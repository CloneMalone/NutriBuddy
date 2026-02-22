const BASE_URL = "/api";

/** Shape of the request body for POST /api/users/register */
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  calorieBudget: number;
}

/** Shape of a successful registration response */
interface RegisterResponse {
  message: string;
}

/**
 * Calls the backend registration endpoint.
 * Throws an Error whose message is the server-provided validation error
 * (e.g. "Password must be at least 8 characters") so the UI can display it directly.
 */
export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    // The backend returns { error: "..." } for both 400 and 500 responses
    throw new Error(data.error ?? "Registration failed");
  }

  // return the data as a RegisterResponse, 
  // which has a "message" field with the success message from the server
  return data as RegisterResponse;
}
