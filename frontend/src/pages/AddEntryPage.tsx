import AuthNavBar from "../components/AuthNavBar";
import AuthNavDock from "../components/AuthNavDock";
import AddEntryForm from "../components/AddEntryForm";


export default function AddEntryPage() {
    return (
        <>
            <AuthNavBar />
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <AddEntryForm />
            </section>
            <AuthNavDock />
        </>
    );
}