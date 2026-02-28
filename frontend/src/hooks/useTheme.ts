import { useCallback, useEffect, useState } from "react";

/** localStorage key used to persist the user's theme preference. */
const STORAGE_KEY = "nutribuddy-theme";

/** Fallback theme when nothing is saved in localStorage. */
const DEFAULT_THEME = "halloween";

/**
 * Manages the active DaisyUI theme.
 *
 * On mount  → reads the saved theme from localStorage (falls back to DEFAULT_THEME).
 * On change → writes the new theme to localStorage and updates the data-theme
 *             attribute on <html> so DaisyUI picks it up immediately.
 */
export function useTheme() {
    const [theme, setThemeState] = useState<string>(() => {
        return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME;
    });

    // Sync the data-theme attribute and localStorage whenever the theme changes
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    /** Update the active theme. */
    const setTheme = useCallback((newTheme: string) => {
        setThemeState(newTheme);
    }, []);

    return { theme, setTheme };
}
