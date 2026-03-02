interface AuthNavBarProps {
    firstInitial: string;
    lastInitial: string;
    /** Called when the user clicks the Logout button. */
    onLogout: () => void;
    /** Whether the logout request is in progress. */
    logoutLoading: boolean;
}

/**
 * Dumb component — renders the authenticated navigation bar.
 * Receives logout behavior as props from the parent (AuthLayout).
 */
export default function AuthNavBar({ firstInitial, lastInitial, onLogout, logoutLoading }: AuthNavBarProps) {
    return (
        <nav className="bg-base-100 shadow-sm">
            <div className="navbar container mx-auto pr-4">
                <div className="flex-1">
                    <a href="/" className="btn btn-ghost text-xl">
                        🍇 <span>
                            Nutri<span className="text-primary">Buddy</span>
                        </span>
                    </a>
                </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-online avatar-placeholder">
                            <div className="bg-neutral text-neutral-content w-24 rounded-full">
                                <span className="text-xl">{firstInitial}{lastInitial}</span>
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            <li><a href="/profile">Profile</a></li>
                            <li>
                                <button onClick={onLogout} disabled={logoutLoading}>
                                    {logoutLoading ? "Logging out…" : "Logout"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}