import AuthNavBar from "../components/AuthNavBar";
import AuthNavDock from "../components/AuthNavDock";
import Dashboard from "../components/Dashboard";


export default function DashboardPage() {
    return (
        <>
            <AuthNavBar />
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex flex-col">
                <Dashboard />
            </section>
            <AuthNavDock />
        </>
    );
}