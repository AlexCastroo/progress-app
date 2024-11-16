import { useEffect, useState } from "react";
import CardTask from "../Components/CardTask";
import AppLayout from "../Layouts/AppLayout";

export default function Home({...props}) {

    const initialTask = {
        title: "Mi first Task",
        description: "Description...",
    }
    const [name, setName] = useState(props.name);
    const [task, setTask] = useState(initialTask);

    const handleClick = () => {
        setName((prev) => prev === "John Doe" ? "Jane" : "John Doe");
        console.log(name);
    }

    return (
        <AppLayout>
        <div className="flex flex-col">
            <div>
            <h1 className="title">Hello, {name}</h1>
            </div>
            <div>
            <button 
                type="button"
                onClick={handleClick}
                className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Change User</button>
            </div>
            <CardTask task={initialTask} user={name} />
        </div>
        </AppLayout>
    );
}