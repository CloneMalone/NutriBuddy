import AuthLayout from "../layouts/AuthLayout";
import SettingsForm from "../components/SettingsForm";
import { useTheme } from "../hooks/useTheme";

/**
 * Smart page — orchestrates theming via the useTheme hook and passes
 * the current theme + setter down to the presentational SettingsForm.
 */
export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    return (
        <AuthLayout>
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <SettingsForm theme={theme} onThemeChange={setTheme} />
            </section>
        </AuthLayout>
    );
}