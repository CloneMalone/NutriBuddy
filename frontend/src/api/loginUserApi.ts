const BASE_URL = "/api";

/** Shape of the request body for POST /api/users/login */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Shape of a successful login response */
interface LoginResponse {
  message: string;
}

/**
 * Calls the backend login endpoint.
 * Throws an Error whose message is the server-provided validation error
 * (e.g. "Invalid email or password") so the UI can display it directly.
 */
export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // Important for sending cookies
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response.json();
}