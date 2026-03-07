import type { ChangeEvent } from "react";

/** All 35 built-in DaisyUI themes in the order they appear in the docs. */
const DAISY_THEMES = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
    "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
    "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
    "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
    "night", "coffee", "winter", "dim", "nord", "sunset", "caramellatte",
    "abyss", "silk"
] as const;

/** Capitalise the first letter of a theme name for the dropdown label. */
function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

interface SettingsFormProps {
    /** The currently active theme value. */
    theme: string;
    /** Called when the user selects a different theme. */
    onThemeChange: (theme: string) => void;
}

/** Presentational form that renders a dropdown for picking a DaisyUI theme. */
export default function SettingsForm({ theme, onThemeChange }: SettingsFormProps) {
    /** Reads the selected value and forwards it to the parent. */
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        onThemeChange(e.target.value);
    }

    return (
        <form className="mb-30 flex flex-col w-full sm:bg-base-100 sm:card sm:shadow-md sm:max-w-md sm:w-full sm:rounded-box sm:border sm:border-primary" action="">
            <div className="flex-1 flex flex-col justify-center gap-4 p-6 sm:card-body sm:gap-4">
                <h2 className="mb-5 card-title justify-left text-center text-3xl sm:text-2xl font-bold">⚙️ Account Settings</h2>
                <h3 className="mb-2 text-xl">Choose Theme</h3>
                <select
                    className="select select-secondary select-xl sm:select-md w-full"
                    value={theme}
                    onChange={handleChange}
                >
                    {DAISY_THEMES.map((t) => (
                        <option key={t} value={t}>
                            {capitalize(t)}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    );
}