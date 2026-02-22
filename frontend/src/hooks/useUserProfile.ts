import { useCallback, useEffect, useState } from "react";
import { getUserProfile, type UserProfile } from "../api/getUserProfileApi";

/**
 * Fetches the authenticated user's profile from the backend.
 *
 * Same standalone-fetch pattern as useNutritionLogs — each page that
 * needs profile data calls this hook directly (no shared context).
 */
export function useUserProfile() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /** Fetch (or re-fetch) the user profile. */
    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const profile = await getUserProfile();
            setUser(profile);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { user, loading, error, refreshProfile: fetchProfile };
}
