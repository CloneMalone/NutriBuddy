import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <section className="hero bg-base-200 min-h-[60vh]">
                <Hero />
            </section>
        </>
    );
}