const BASE_URL = "/api";

/** Shape of the user profile returned by GET /api/users/me */
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    calorieBudget: number;
}

/** Response wrapper from the backend */
interface GetUserProfileResponse {
    user: UserProfile;
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

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    const data: GetUserProfileResponse = await response.json();
    return data.user;
}
