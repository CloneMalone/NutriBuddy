import AuthNavBar from "../components/AuthNavBar";
import AuthNavDock from "../components/AuthNavDock";
import ProfilePageAvatar from "../components/ProfilePageAvatar";
import { ProfilePageData } from "../components/ProfilePageData";


export default function ProfilePage() {
    return (
        <>
            <AuthNavBar />
            <section className="min-h-[calc(100dvh)] bg-base-200 flex flex-col items-center justify-center">
                <ProfilePageAvatar />
                <ProfilePageData />
            </section>
            <AuthNavDock />
        </>
    );
}