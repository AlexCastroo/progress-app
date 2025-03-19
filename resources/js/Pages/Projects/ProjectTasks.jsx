import { Edit, TaskSharp } from '@mui/icons-material';
import CardTask from "@/Components/CardTask";
import React, { useEffect, useCallback, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Inertia } from '@inertiajs/inertia';
import '../../../css/Project.css';
import { Container } from '@mui/material';
import TaskForm from '@/Components/TaskForm';
import Panel from '@/Components/Panel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';


export default function Project( props ) {

    const project = props.project;
    // Panel lateral
    const [openPanel, setOpenPanel] = useState(false);

    const [tasks, setTasks] = useState(props.tasks);
    const [pendingTasks, setPendingTasks] = useState(null);
    const [inProgressTasks, setInProgressTasks] = useState(null);
    //const [reviewTasks, setReviewTasks] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(null);
    //const [openEditForm, setOpenEditForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleTaskPanel = (task) => {
        //setOpenEditForm(true);
        setTaskToEdit(task);
        setOpenPanel(true);
    }

    useEffect(() => {
        setPendingTasks(tasks.filter( task => task.status === 'pending' ));
        setInProgressTasks(tasks.filter( task => task.status === 'in-progress' || task.status === 'paused' ));
        //setReviewTasks(tasks.filter( task => task.status === 'review' ));
        setCompletedTasks(tasks.filter( task => task.status === 'completed' ));
        console.log("Tasks Useeffect => ", tasks);
    }, [tasks]);



    // Task listing
    const fetchTasks = () => {
        axios.get(route('getTasksList', { project: project.id }))
            .then(response => {
                console.log("Fetching Tasks", response.data);
                setTasks([]); // Vacía primero el estado
                setTimeout(() => {
                    setTasks([...response.data]); // Luego actualiza con los nuevos datos
                }, 10);
                setOpenPanel(false);
                setTaskToEdit(null);
            })
            .catch(error => {
                console.log("Error Fetching Tasks", error);
            });
    };

    return (
    <>
        <AppLayout project={project}>
                <div class="container-project">
                    <div class="container-kanban">
                        <div class="column">
                            <h2 class="title-kanban-pending">
                                Pendiente
                            </h2>

                            <div class="column-kanban">
                                {pendingTasks?.map( task => (
                                    <CardTask
                                        key={task.id}
                                        task={task}
                                        showTask={() => handleTaskPanel(task)}
                                        />
                                ))}
                            </div>

                            <AddCircleOutlineIcon onClick={() => {
                                setOpenPanel(true);
                                setTaskToEdit(null);
                                }} />
                        </div>

                        <div class="column">
                            <h2 class="title-kanban-progress">
                                En progreso
                            </h2>
                            <div class="column-kanban">
                                {inProgressTasks?.map( task => (
                                    <CardTask
                                        key={task.id}
                                        task={task}
                                        showTask={() => handleTaskPanel(task)}
                                        updateList={fetchTasks}
                                        />
                                ))}
                            </div>
                        </div>



                        <div class="column">
                            <h2 class="title-kanban-completed">
                                Completada
                            </h2>
                            <div class="column-kanban">
                                {completedTasks?.map( task => (
                                    <CardTask key={task.id} task={task} showTask={setOpenPanel}>
                                    </CardTask>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1>Tasks history</h1>
                    </div>

                    {
                        openPanel &&
                            <Panel
                                setOpen={setOpenPanel}
                                project={project}
                                task={taskToEdit}
                                updateList={fetchTasks}
                                />
                    }
                </div>

        </AppLayout>


    </>
  )
}
