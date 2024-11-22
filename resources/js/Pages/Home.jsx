import { useEffect, useState } from "react";
import CardTask from "../Components/CardTask";
import AppLayout from "../Layouts/AppLayout";
import Button from '@mui/material/Button';
import { Create } from "@mui/icons-material";
import CreateTask from "../Components/CreateTask";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function Home({...props}) {

    const initialTask = {
        id: "",
        title: "",
        description: "",
    }

    const initialTaskList = {
        tasks: [],
    }
    const [name, setName] = useState(props.name);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(initialTask); // Formulario de task
    const [editMode, setEditMode] = useState(false);

    const handleClick = () => {
        setName((prev) => prev === "John Doe" ? "Jane" : "John Doe");
        console.log(name);
    }

    const handleCreateTask = () => {
        console.log("Creating task...");
        setTasks((e) => [...tasks, task]);
        // Limpiamos el formulario
        setTask(initialTask);
        console.log(tasks);
    }

    const handleDeleteTask = (taskTitle) => {
        console.log("Deleting task...", taskTitle);
        setTasks((prevTasks) => prevTasks.filter((task) => task.title !== taskTitle));
    };

    const handleEditTask = (task) => {
        if (editMode) 
        {
            console.log("Updating task...", task);
            setTasks((prevTasks) => prevTasks.map((t) => t.id === task.id ? { ...t, ...task } : t));
            setEditMode(false);
            setTask(initialTask);
        } 
        else 
        {
            console.log("Editing task...", task);
            setTask(task);
            setEditMode(true);
        }
    };

    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);



    return (
        <AppLayout>
        <div>
            <h1 class="text-2xl font-bold text-slate-900">Hello, {name}</h1>
            <h5 class="text-sm italic text-slate-500">This is your own second Brain</h5>
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
                            user={name} 
                            deleteTask={handleDeleteTask}
                            updateTask={handleEditTask}/>
                    ))}
                </div>
            <div class="col-span-1 p-4 h-80 bg-slate-200 bg-opacity-20 border border-gray-200 rounded-lg shadow">
                <h3 class="text-lg font-bold text-slate-700">
                    Manage task
                    </h3>
                    {/* formulario para crear una task */}
                    <form>
                        <div class="mb-2">
                            <TextField
                                id="id"
                                name="id"
                                label="Id"
                                value={task.id}
                                onChange={(e) => setTask({...task, id: e.target.value})}
                                variant="standard"
                                fullWidth
                            />
                            </div>
                        <div class="mb-2">
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                value={task.title}
                                onChange={(e) => setTask({...task, title: e.target.value})}
                                variant="standard"
                                fullWidth
                            />
                            </div>
                        <div class="mb-8">
                            <TextField
                                id="title"
                                name="description"
                                label="Description"
                                value={task.description}
                                onChange={(e) => setTask({...task, description: e.target.value})}
                                variant="standard"
                                fullWidth
                            />
                            </div>
                            {
                                editMode ? (
                                    <>
                                    <Button onClick={() => handleEditTask(task)} variant="contained" color="warning">
                                    Update
                                    </Button>
                                    <Button onClick={(e) => {
                                        setEditMode(false);
                                        setTask(initialTask)
                                        }} 
                                        variant="outlined" color="error">
                                    Cancel
                                    </Button>
                                    </>
                                ) : (
                                    <PlaylistAddIcon 
                                        className="h-12 w-12 p-2 text-slate-400 bg-slate-200 rounded-full"
                                    onClick={handleCreateTask}  />
                                )
                            }

                    </form>
                </div>
                
        </div>

 

     
        </AppLayout>
    );
}