
export default function RegisterForm() {
    return (
            <form className="flex flex-col w-full sm:bg-base-100 sm:card sm:shadow-md sm:max-w-md sm:w-full sm:rounded-box sm:border sm:border-primary" action="">
                <div className="flex-1 flex flex-col justify-center gap-4 p-6 sm:card-body sm:gap-4">
                    <h2 className="card-title justify-center text-center text-3xl sm:text-2xl font-bold">🍎 Create an Account</h2>
                    <div className="form-control w-full">
                        <input type="text" placeholder="Enter your first name" className="input input-secondary input-xl sm:input-md w-full" />
                    </div>
                    <div className="form-control w-full">
                        <input type="text" placeholder="Enter your last name" className="input input-secondary input-xl sm:input-md w-full" />
                    </div>
                    <div className="form-control w-full">
                        <input type="email" placeholder="Enter your email" className="input input-secondary input-xl sm:input-md  w-full" />
                    </div>
                    <div className="form-control w-full">
                        <input type="password" placeholder="Enter your password" className="input input-secondary input-xl sm:input-md w-full" />
                    </div>
                    <div className="form-control w-full">
                        <input type="password" placeholder="Confirm your password" className="input input-secondary input-xl sm:input-md w-full" />
                    </div>
                    <div className="form-control w-full">
                        <input type="number" placeholder="Enter your calorie budget" className="input input-secondary input-xl sm:input-md w-full" />
                    </div>
                    <button className="btn btn-primary mt-4 w-full btn-xl sm:btn-md">Register</button>
                    <a href="/login" className="text-center mt-2 hover:underline cursor-pointer">Already have an account? <span className="text-primary">Login</span></a>
                </div>
            </form>
    );
}