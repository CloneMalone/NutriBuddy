export default function Dashboard() {
    return (
        <div className="container flex flex-col gap-6 p-6 mx-auto">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">👋🏼 Hello, <span className="text-primary">Jenny!</span></h1>
                <div className="inline-grid *:[grid-area:1/1] items-center  gap-2">
                    <div className="status status-success animate-ping"></div>
                    <div className="status status-success"></div>
                    <p className="text-xs uppercase font-semibold opacity-60 ml-3">Plenty Calories Left</p>
                </div> 
            </div>
            <div className="stats text-center bg-primary border-base-300 border w-full">
                <div className="stat text-primary-content">
                    <div className="text">Calories Budget</div>
                    <div className="stat-value">2,000</div>
                    <div className="stat-desc text-primary-content">You have 2,000 calories remaining</div>
                </div>
            </div>
            <div className="stats text-center bg-primary border-base-300 border w-full">
                <div className="stat text-primary-content">
                    <div className="text">Calories Consumed</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc text-primary-content">You have consumed 1,200 calories today</div>
                </div>
            </div>
            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Today's Entries</li>

                <li className="list-row cursor-pointer rounded-none hover:bg-base-200">
                    <div className="text-3xl">🥗</div>
                    <div>
                        <div>Grilled Chicken Salad</div>
                        <div className="text-xs uppercase font-semibold opacity-60">450 calories</div>
                    </div>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></g></svg>
                    </button>
                </li>

                <li className="list-row cursor-pointer rounded-none hover:bg-base-200">
                    <div className="text-3xl">🍎</div>
                    <div>
                        <div>Apple</div>
                        <div className="text-xs uppercase font-semibold opacity-60">95 calories</div>
                    </div>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></g></svg>
                    </button>
                </li>

                <li className="list-row cursor-pointer rounded-none hover:bg-base-200">
                    <div className="text-3xl">🥪</div>
                    <div>
                        <div>Turkey Sandwich</div>
                        <div className="text-xs uppercase font-semibold opacity-60">655 calories</div>
                    </div>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></g></svg>
                    </button>
                </li>

            </ul>
        </div>
    );
}