import NavBar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";


export default function RegisterPage() {
    return (
        <>
            <NavBar />
            <section className="min-h-[calc(100dvh-4rem)] bg-base-200 flex items-stretch sm:items-center sm:justify-center">
                <RegisterForm />
            </section>
        </>
    );
}