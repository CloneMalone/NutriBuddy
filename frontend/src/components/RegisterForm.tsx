import type { ChangeEvent, FormEvent } from "react";

/** Props passed down from the page component — keeps this component purely presentational. */
interface RegisterFormProps {
    form: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        calorieBudget: string;
    };
    loading: boolean;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent) => void;
}

export default function RegisterForm({ form, loading, handleChange, handleSubmit }: RegisterFormProps) {
    return (
        <form
            className="mb-30 flex flex-col w-full sm:bg-base-100 sm:card sm:shadow-md sm:max-w-md sm:w-full sm:rounded-box sm:border sm:border-primary"
            onSubmit={handleSubmit}
        >
            <div className="flex-1 flex flex-col justify-center gap-4 p-6 sm:card-body sm:gap-4">
                <h2 className="card-title justify-center text-center text-3xl sm:text-2xl font-bold">🍎 Create an Account</h2>

                <div className="form-control w-full">
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your first name" className="input input-secondary input-xl sm:input-md w-full" required />
                </div>
                <div className="form-control w-full">
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter your last name" className="input input-secondary input-xl sm:input-md w-full" required />
                </div>
                <div className="form-control w-full">
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="input input-secondary input-xl sm:input-md w-full" required />
                </div>
                <div className="form-control w-full">
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className="input input-secondary input-xl sm:input-md w-full" required />
                </div>
                <div className="form-control w-full">
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="input input-secondary input-xl sm:input-md w-full" required />
                </div>
                <div className="form-control w-full">
                    <input type="number" name="calorieBudget" value={form.calorieBudget} onChange={handleChange} placeholder="Enter your calorie budget" className="input input-secondary input-xl sm:input-md w-full" required />
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-full btn-xl sm:btn-md" disabled={loading}>
                    {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
                </button>
                <a href="/login" className="text-center mt-2 hover:underline cursor-pointer">Already have an account? <span className="text-primary">Login</span></a>
            </div>
        </form>
    );
}