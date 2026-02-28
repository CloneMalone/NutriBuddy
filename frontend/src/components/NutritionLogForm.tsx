import type { ChangeEvent, FormEvent } from "react";

/** Props passed down from the page component — keeps this component purely presentational. */
interface NutritionLogFormProps {
    form: {
        emojiIcon: string;
        description: string;
        calories: string;
        date: string;
    };
    loading: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: FormEvent) => void;
    /** Heading displayed at the top of the form. */
    title?: string;
    /** Label for the submit button. */
    submitLabel?: string;
}

/** Reusable presentational form for adding or editing a nutrition log entry. */
export default function NutritionLogForm({
    form,
    loading,
    onChange,
    onSubmit,
    title = "🥕 Add a Food Entry",
    submitLabel = "Add Entry",
}: NutritionLogFormProps) {
    return (
        <form
            className="mb-30 flex flex-col w-full sm:bg-base-100 sm:card sm:shadow-md sm:max-w-md sm:rounded-box sm:border sm:border-primary"
            onSubmit={onSubmit}
        >
            <div className="flex-1 flex flex-col justify-center gap-4 p-6 sm:card-body sm:gap-4">
                <h2 className="card-title justify-center text-center text-3xl sm:text-2xl font-bold">{title}</h2>

                {/* Emoji icon selector */}
                <div className="form-control w-full">
                    <select
                        name="emojiIcon"
                        value={form.emojiIcon}
                        onChange={onChange}
                        className="select select-secondary select-xl sm:select-md w-full"
                        required
                    >
                        <option value="" disabled>Choose an icon</option>
                        <option value="🍎">🍎 Apple / Fruit</option>
                        <option value="🥗">🥗 Salad</option>
                        <option value="🥪">🥪 Sandwich</option>
                        <option value="🍕">🍕 Pizza</option>
                        <option value="🍔">🍔 Burger</option>
                        <option value="🌮">🌮 Taco</option>
                        <option value="🍣">🍣 Sushi</option>
                        <option value="🍗">🍗 Chicken</option>
                        <option value="🥦">🥦 Veggies</option>
                        <option value="🥚">🥚 Eggs</option>
                        <option value="🥤">🥤 Drink</option>
                        <option value="🍩">🍩 Snack / Dessert</option>
                    </select>
                </div>

                {/* Food description */}
                <div className="form-control w-full">
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        placeholder="Enter food description"
                        className="input input-secondary input-xl sm:input-md w-full"
                        required
                    />
                </div>

                {/* Calories */}
                <div className="form-control w-full">
                    <input
                        type="number"
                        name="calories"
                        value={form.calories}
                        onChange={onChange}
                        placeholder="Enter calories"
                        className="input input-secondary input-xl sm:input-md w-full"
                        required
                    />
                </div>

                {/* Date — defaults to today */}
                <div className="form-control w-full">
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={onChange}
                        className="input input-secondary input-xl sm:input-md w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary mt-4 w-full btn-xl sm:btn-md"
                    disabled={loading}
                >
                    {loading ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
                </button>
            </div>
        </form>
    );
}