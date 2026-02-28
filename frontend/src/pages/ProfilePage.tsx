import AuthLayout from "../layouts/AuthLayout";
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
                    <div className="flex w-52 flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                            <div className="flex flex-col gap-4">
                                <div className="skeleton h-4 w-20"></div>
                                <div className="skeleton h-4 w-28"></div>
                            </div>
                        </div>
                        <div className="skeleton h-32 w-full"></div>
                    </div>
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