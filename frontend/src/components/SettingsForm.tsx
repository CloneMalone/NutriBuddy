export default function SettingsForm() {
    return (
        <form className="mb-30 flex flex-col w-full sm:bg-base-100 sm:card sm:shadow-md sm:max-w-md sm:w-full sm:rounded-box sm:border sm:border-primary" action="">
            <div className="flex-1 flex flex-col justify-center gap-4 p-6 sm:card-body sm:gap-4">
                <h2 className="mb-5 card-title justify-left text-center text-3xl sm:text-2xl font-bold">⚙️ Account Settings</h2>
                <h3 className="mb-2 text-xl">Choose Theme</h3>
                <div className="join join-vertical">
                    <input
                        type="radio"
                        name="theme-buttons"
                        className="btn theme-controller join-item"
                        aria-label="Default"
                        value="default" />
                    <input
                        type="radio"
                        name="theme-buttons"
                        className="btn theme-controller join-item"
                        aria-label="Retro"
                        value="retro" />
                    <input
                        type="radio"
                        name="theme-buttons"
                        className="btn theme-controller join-item"
                        aria-label="Cyberpunk"
                        value="cyberpunk" />
                    <input
                        type="radio"
                        name="theme-buttons"
                        className="btn theme-controller join-item"
                        aria-label="Valentine"
                        value="valentine" />
                    <input
                        type="radio"
                        name="theme-buttons"
                        className="btn theme-controller join-item"
                        aria-label="Aqua"
                        value="aqua" />
                </div>
            </div>
        </form>
    );
}