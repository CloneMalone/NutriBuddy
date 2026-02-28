interface DashboardProps {
    firstName: string;
    calorieBudget: number;
    caloriesConsumed: number;
    entries: {
        id: string;
        description: string;
        calories: number;
        emojiIcon: string;
    }[];
    /** Called when the user clicks on an entry row (not the delete button). */
    onEntryClick: (id: string) => void;
}

/** Determine the status color and message based on how close the user is to their calorie budget. */
function getCalorieStatus(budget: number, consumed: number) {
    const remaining = budget - consumed;

    // Over budget
    if (remaining < 0) {
        return {
            color: "status-error",
            message: `Over budget by ${Math.abs(remaining)} calories`,
        };
    }
    // Exactly at budget
    if (remaining === 0) {
        return {
            color: "status-warning",
            message: "You've reached your calorie budget",
        };
    }
    // Close to budget (within 20%)
    if (remaining <= budget * 0.2) {
        return {
            color: "status-warning",
            message: `Only ${remaining} calories remaining`,
        };
    }
    // Plenty left
    return {
        color: "status-success",
        message: "Plenty of calories left",
    };
}

export default function Dashboard({ firstName, calorieBudget, caloriesConsumed, entries, onEntryClick }: DashboardProps) {
    const { color, message } = getCalorieStatus(calorieBudget, caloriesConsumed);
    const caloriesRemaining = calorieBudget - caloriesConsumed;

    return (
        <div className="container flex flex-col gap-6 p-6 mx-auto pb-30">
            {/* Greeting and calorie status indicator */}
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl font-bold">👋🏼 Hello, <span className="text-primary">{firstName}!</span></h1>
                <div className="inline-grid *:[grid-area:1/1] items-center gap-2">
                    <div className={`status ${color} animate-ping`}></div>
                    <div className={`status ${color}`}></div>
                    <p className="text-xs uppercase font-semibold opacity-60 ml-3">{message}</p>
                </div>
            </div>

            {/* Calorie budget card */}
            <div className="stats text-center bg-primary border-base-300 border w-full">
                <div className="stat text-primary-content">
                    <div className="text">Calories Budget</div>
                    <div className="stat-value">{caloriesRemaining}</div>
                    <div className="stat-desc text-primary-content">
                        {caloriesRemaining >= 0
                            ? `You have ${caloriesRemaining} calories remaining`
                            : `You are ${Math.abs(caloriesRemaining)} calories over budget`}
                    </div>
                </div>
            </div>

            {/* Calories consumed card */}
            <div className="stats text-center bg-primary border-base-300 border w-full">
                <div className="stat text-primary-content">
                    <div className="text">Calories Consumed</div>
                    <div className="stat-value">{caloriesConsumed}</div>
                    <div className="stat-desc text-primary-content">You have consumed {caloriesConsumed} calories today</div>
                </div>
            </div>

            {/* Today's entries list */}
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Today's Entries</li>

                {/* Empty state — shown when there are no entries */}
                {entries.length === 0 && (
                    <li className="list-row rounded-none">
                        <div className="text-3xl">📝</div>
                        <div>
                            <div>No entries yet</div>
                            <div className="text-xs uppercase font-semibold opacity-60">
                                Tap "Add Entry" below to log your first meal
                            </div>
                        </div>
                    </li>
                )}

                {/* Render each entry */}
                {entries.map((entry) => (
                    <li
                        key={entry.id}
                        className="list-row cursor-pointer rounded-none hover:bg-base-200"
                        onClick={() => onEntryClick(entry.id)}
                    >
                        <div className="text-3xl">{entry.emojiIcon}</div>
                        <div>
                            <div>{entry.description}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{entry.calories} calories</div>
                        </div>
                        <button
                            className="btn btn-square btn-ghost"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></g></svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}