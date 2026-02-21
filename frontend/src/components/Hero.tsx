export default function Hero() {
    return (
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                    Your Nutrition <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Sidekick</span>
                </h1>
                <p className="py-6">
                    Log meals, monitor your nutrients, and stay consistent with your goals.
                    NutriBuddy keeps things simple so healthy habits actually stick.
                </p>
                <a href="/register" className="btn btn-primary">
                    Get Started
                </a>
            </div>
        </div>
    );
}