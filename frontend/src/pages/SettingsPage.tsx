import AuthLayout from "../layouts/AuthLayout";
import SettingsForm from "../components/SettingsForm";

/**
 * Settings page — renders the theme picker form.
 */
export default function SettingsPage() {
    return (
        <AuthLayout>
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <SettingsForm />
            </section>
        </AuthLayout>
    );
}