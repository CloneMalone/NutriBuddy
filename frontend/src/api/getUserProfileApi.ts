const BASE_URL = "/api";

/** Shape of the user profile returned by GET /api/users/me */
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    calorieBudget: number;
}

/**
 * Fetches the authenticated user's profile from the backend.
 * Relies on the session cookie being sent automatically via `credentials: "include"`.
 *
 * @throws Error with the server-provided message on failure (e.g. 401 "Not authenticated")
 */
export async function getUserProfile(): Promise<UserProfile> {
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }
    
    return data.user as UserProfile;
}
