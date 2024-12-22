import { useEffect, useState } from "react";
import CardTask from "../Components/CardTask";
import AppLayout from "../Layouts/AppLayout";
import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useForm } from '@inertiajs/react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";

export default function Home({...props}) {

    const initialTask = {
        title: "",
        category: "",
        status: "",
        description: "",
    }

    const initialTaskList = {
        tasks: [],
    }

    const MenuOptions = {
        DEVELOP: 'develop',
        DESIGN: 'design',
        ORGANIZATION: 'organization',
        BRAINS: 'brains',
      };

    const statusOptions = {
        PENDING: 'pending',
        INPROGRESS: 'in-progress',
        COMPLETED: 'completed',
    };
    
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(initialTask);
    const [editMode, setEditMode] = useState(false);

    // Task form handling
    const { data, setData, post, get, processing, errors, reset } = useForm({
        title: '',
        category: '',
        status: '',
        description: '',
      })
      
    function submit(e) {
        e.preventDefault()
        // Peticion POST a la 
        post(route('task.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('title', 'category', 'status', 'description'),
                // Renderizamos la card en el front
                fetchTasks();
            },
            onError: (errors) => {
                console.log("Error Creating Task", errors)
            },
        });
        console.log(data);
    }

     // DELETE task from CardTask
     const handleDeleteTask = (task) => {
        console.log("Deleting task...", task.id);
        axios.delete(`/tasks/${task.id}`)
            .then(response => {
                console.log("Task Deleted", response.data);
                fetchTasks();
            })
            .catch(error => {
                console.log("Error Deleting Task", error);
            }); 
    };

    // UPDATE task from Task form
    const handleEditTask = (task) => {
        if (editMode) 
        {
            axios.put(`/tasks/${task.id}`, data)
                .then(response => {
                    console.log("Task Updated", response.data);
                    fetchTasks();
                })
                .catch(error => {
                    console.log("Error Updating Task", error);
                }
            );
        } 
        else 
        {
            setTask(task);
            setData(task);
            setEditMode(true);
        }
    };

    // Task listing
    const fetchTasks = () => {
        axios.get(route('task.index'))
            .then(response => {
                console.log("Tasks Fetched", response.data);
                setTasks(response.data);
            })
            .catch(error => {
                console.log("Error Fetching Tasks", error);
            });

    };

    const date = new Date();
    const [time, setTime] = useState(moment(date).format('hh:mm:ss'));
    
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment(new Date()).format('hh:mm:ss'));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
    

    return (
        <AppLayout>
        <div>
            <h1 class="text-2xl font-bold text-slate-900">Hello, {name}</h1>
            <h5 class="text-sm italic text-slate-500">This is your own second Brain</h5>
            {time}
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
                            deleteTask={handleDeleteTask}
                            updateTask={handleEditTask}/>
                    ))}
                </div>
            <div class="col-span-1 p-4 h-80 bg-slate-200 bg-opacity-20 border border-gray-200 rounded-lg shadow">
                <h3 class="text-lg font-bold text-slate-700">
                    Manage task
                    </h3>
                    {/* ERRORS */}
                    {errors.id && <div>{errors.id}</div>}
                    {errors.title && <div>{errors.title}</div>}
                    {errors.descripcion && <div>{errors.descripcion}</div>}

                    {/* formulario para crear una task */}
                    <form onSubmit={submit}>
                        <div class="mb-2">
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                value={data.title || task.title}
                                onChange={e => setData('title', e.target.value)}
                                variant="standard"
                                fullWidth
                            />
                            </div>
                        <div class="flex justify-between mb-2">
                        <FormControl variant="standard" sx={{ minWidth: '48%' }}>
                            <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    value={data.category || task.category}
                                    label="Category"
                                    onChange={e => setData('category', e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={MenuOptions.DEVELOP}>Develop</MenuItem>
                                        <MenuItem value={MenuOptions.DESIGN}>Design</MenuItem>
                                        <MenuItem value={MenuOptions.ORGANIZATION}>Organization</MenuItem>
                                        <MenuItem value={MenuOptions.BRAINS}>Brains</MenuItem>
                                </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ minWidth: '48%' }}>
                            <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    value={data.status || task.status}
                                    label="Status"
                                    onChange={e => setData('status', e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={statusOptions.PENDING}>Pending</MenuItem>
                                        <MenuItem value={statusOptions.INPROGRESS}>In progress</MenuItem>
                                        <MenuItem value={statusOptions.COMPLETED}>Completed</MenuItem>
                                </Select>
                        </FormControl>
                            </div>
                        <div class="mb-8">
                            <TextField
                                id="title"
                                name="description"
                                label="Description"
                                value={data.description || task.description}
                                onChange={e => setData('description', e.target.value)}
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
                                        setTask(initialTask);
                                        }} 
                                        variant="outlined" color="error">
                                    Cancel
                                    </Button>
                                    </>
                                ) : (
                                    <button type="submit" class="bg-slate-700 text-white p-2 rounded-lg">Create</button>
                                )
                            }

                    </form>
                </div>
                
        </div>

 

     
        </AppLayout>
    );
}