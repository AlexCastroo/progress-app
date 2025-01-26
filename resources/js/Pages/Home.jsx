import * as React from 'react';
import { useEffect, useState } from "react";
import CardTask from "../Components/CardTask";
import AppLayout from "../Layouts/AppLayout";
import axios from "axios";
import moment from "moment";
import TaskForm from '../Components/TaskForm';
import Clock from '../Components/Clock';

export default function Home( props ) {

    const [tasks, setTasks] = useState(props.taskList);

    // Task listing
    const fetchTasks = () => {
        axios.get(route('getTasksList'))
            .then(response => {
                console.log("Fetching Tasks", response);
                setTasks(response.data);
            })
            .catch(error => {
                console.log("Error Fetching Tasks", error);
            });

    };

    return (
        <AppLayout>
        <div>
            <h1 class="text-2xl font-bold text-slate-900">Hello, {name}</h1>
            <h5 class="text-sm italic text-slate-500">This is your own second Brain</h5>
            <Clock />
        </div>
        <div class="grid grid-cols-2 gap-10">
            <div class="col-span-1 p-4 h-auto bg-slate-400 bg-opacity-20 border border-gray-200 rounded-lg shadow">
                <h3 class="text-lg font-bold text-slate-700">
                    Task list
                    </h3>
                    {/* lista de tasks */}
                    {tasks.map((task, index) => (
                        <CardTask
                            key={index}
                            task={task}
                            updateList={fetchTasks}
                        />
                    ))}
            </div>
            <TaskForm updateList={fetchTasks} />
        </div>




        </AppLayout>
    );
}
