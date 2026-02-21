import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";


export default function LoginPage() {
    return (
        <>
            <NavBar />
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <LoginForm />
            </section>
        </>
    );
}