export default function AddEntryForm() {
    return (
        <form className="flex flex-col w-full sm:bg-base-100 sm:card sm:shadow-md sm:max-w-md sm:w-full sm:rounded-box sm:border sm:border-primary" action="">
            <div className="flex-1 flex flex-col justify-center gap-4 p-6 sm:card-body sm:gap-4">
                <h2 className="card-title justify-center text-center text-3xl sm:text-2xl font-bold">🥕 Add a Food Entry</h2>
                <div className="form-control w-full">
                    <select defaultValue="" className="select select-secondary select-xl sm:select-md w-full">
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
                <div className="form-control w-full">
                    <input type="text" placeholder="Enter food description" className="input input-secondary input-xl sm:input-md w-full" />
                </div>
                <div className="form-control w-full">
                    <input type="number" placeholder="Enter calories" className="input input-secondary input-xl sm:input-md w-full" />
                </div>
                <button className="btn btn-primary mt-4 w-full btn-xl sm:btn-md">Add Entry</button>
            </div>
        </form>
    );
}