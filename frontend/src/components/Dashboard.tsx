import DatePickerButton from "./DatePickerButton";
import formatDateLabel from "../utils/formatDateLabel";

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
    /** Currently selected date in YYYY-MM-DD format. */
    selectedDate: string;
    /** Whether the selected date is today. */
    isToday: boolean;
    /** Latest selectable date (YYYY-MM-DD). */
    maxDate: string;
    /** Called when the user picks a new date from the calendar. */
    onDateChange: (date: string) => void;
    /** Called when the user clicks on an entry row (not the delete button). */
    onEntryClick: (id: string) => void;
    /** Called when the user clicks the delete (trash) button on an entry. */
    onDeleteClick: (entry: { id: string; description: string; calories: number; emojiIcon: string }) => void;
}

export default function Dashboard({
    firstName, calorieBudget, caloriesConsumed, entries,
    selectedDate, isToday, maxDate, onDateChange, onEntryClick, onDeleteClick,
}: DashboardProps) {
    const caloriesRemaining = calorieBudget - caloriesConsumed;

    /** Label used for the entries heading and consumed description. */
    const dateLabel = isToday ? "Today" : formatDateLabel(selectedDate);

    return (
        <div className="container flex flex-col gap-6 p-6 mx-auto pb-30">
            {/* Greeting row — date picker on the right */}
            <div className="flex flex-row items-center justify-between gap-2">
                <h1 className="text-2xl font-bold">👋🏼 Hello, <span className="text-primary">{firstName}!</span></h1>
                <DatePickerButton
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                    maxDate={maxDate}
                />
            </div>



            <div className="flex flex-col gap-4 md:flex-row">
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
                        <div className="stat-desc text-primary-content">
                            {isToday
                                ? `You have consumed ${caloriesConsumed} calories today`
                                : `You consumed ${caloriesConsumed} calories on ${dateLabel}`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Entries list */}
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    {isToday ? "Today's Entries" : `Entries for ${dateLabel}`}
                </li>

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
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteClick(entry);
                            }}
                        >
                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></g></svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}