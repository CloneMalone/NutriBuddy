import AuthLayout from "../components/AuthLayout";
import ProfilePageAvatar from "../components/ProfilePageAvatar";
import ProfilePageData from "../components/ProfilePageData";
import { useUserProfile } from "../hooks/useUserProfile";

/**
 * Smart page — fetches the authenticated user's profile and passes
 * the relevant pieces to the presentational child components.
 */
export default function ProfilePage() {
    const { user, loading } = useUserProfile();

    return (
        <AuthLayout>
            {loading ? (
                <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg" />
                </section>
            ) : (
                <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex flex-col items-center justify-center">
                    <ProfilePageAvatar
                        firstName={user?.firstName ?? ""}
                        lastName={user?.lastName ?? ""}
                    />
                    <ProfilePageData
                        email={user?.email ?? ""}
                        calorieBudget={user?.calorieBudget ?? 0}
                    />
                </section>
            )}
        </AuthLayout>
    );
}