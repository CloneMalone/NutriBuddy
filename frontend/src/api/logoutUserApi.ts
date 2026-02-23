const BASE_URL = "/api";

/** Shape of a successful logout response */
interface LogoutResponse {
  message: string;
}

/**
 * Calls the backend logout endpoint.
 * Destroys the session on the server and clears the session cookie.
 * Throws an Error whose message is the server-provided error
 * so the UI can display it directly.
 */
export async function logoutUser(): Promise<LogoutResponse> {
  const response = await fetch(`${BASE_URL}/users/logout`, {
    method: "POST",
    credentials: "include", // Important for sending the session cookie
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data as LogoutResponse;
}
