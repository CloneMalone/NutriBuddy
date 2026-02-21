
export default function LoginForm() {
    return (
            <form className="flex flex-col w-full sm:bg-base-100 sm:card sm:shadow-md sm:max-w-md sm:w-full sm:rounded-box sm:border sm:border-primary" action="">
                <div className="flex-1 flex flex-col justify-center gap-4 p-6 sm:card-body sm:gap-4">
                    <h2 className="card-title justify-center text-center text-3xl sm:text-2xl font-bold">🍊 Login to Your Account</h2>
                    <div className="form-control w-full">
                        <input type="email" placeholder="Enter your email" className="input input-secondary input-xl sm:input-md w-full" />
                    </div>
                    <div className="form-control w-full">
                        <input type="password" placeholder="Enter your password" className="input input-secondary input-xl sm:input-md w-full" />
                    </div>
                    <button className="btn btn-primary mt-4 w-full btn-xl sm:btn-md">Login</button>
                    <a href="/register" className="text-center mt-2 hover:underline cursor-pointer">Don't have an account? <span className="text-primary">Register</span></a>
                </div>
            </form>
    );
}