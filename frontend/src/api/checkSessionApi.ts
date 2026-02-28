const BASE_URL = "/api";

/** Shape of the response from GET /api/users/check-session */
export interface CheckSessionResponse {
    authenticated: boolean;
}

/**
 * Asks the backend whether the current session cookie is still valid.
 * Relies on the session cookie being sent automatically via `credentials: "include"`.
 *
 * @throws Error with the server-provided message on failure (e.g. 401 when no valid session)
 */
export async function checkSession(): Promise<CheckSessionResponse> {
    const response = await fetch(`${BASE_URL}/users/check-session`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data as CheckSessionResponse;
}
