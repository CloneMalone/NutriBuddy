export default function AuthNavBar() {
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
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-online">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/login">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}