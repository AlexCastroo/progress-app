import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Chip } from '@mui/material';
import axios from "axios";
import { useForm } from '@inertiajs/react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// Componentes propios
//import CheckToggle from './CheckToggle';

export default function CardTask ( props ) {

    const [dropDown, setDropDown] = useState(true);
    const [task, setTask] = useState(props.task);

    // Delete Task
    const handleDeleteTask = (task) => {
        console.log("Deleting task...", task.id);
        axios.delete(`/tasks/${task.id}`)
            .then(response => {
                console.log("Task Deleted", response.data);
                props.updateList();
            })
            .catch(error => {
                console.log("Error Deleting Task", error);
            });
    };

    // Update Task
    const [editMode, setEditMode] = useState(false);


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

    const { data, setData, post, get, processing, errors, reset } = useForm({
        title: '',
        category: '',
        status: '',
        description: '',
        })

    // HANDLE task to edit
    const handleEditTask = (task) => {
        setEditMode(true);
        setData(
            {
                title: task.title,
                category: task.category,
                status: task.status,
                description: task.description,
            }
        );

    };


    // UPDATE task from Task form
    const submitEditTask = () => {
        if (editMode) {
            axios.put(`/tasks/${task.id}`, data)
                .then(response => {
                    setTask(prevTask => ({
                        ...prevTask,
                        ...data,
                    }));
                    props.updateList();
                    reset("title", "category", "status", "description");
                    setEditMode(false);
                })
                .catch(error => {
                    console.log("Error Updating Task", error);
                });
        }
        else
        {
            setData(task);
            setEditMode(true);
        }

    };

   useEffect(() => {
    if (!editMode) {
        setData({
            title: task.title,
            category: task.category,
            status: task.status,
            description: task.description,
        });
    }
}, [editMode, task]);

    return (
        <div
            href="#"
            className="block max-w-lg mb-4 bg-slate-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100  overflow-hidden"
        >
            <form>
                <div className="flex h-6 justify-between items-center bg-slate-600 p-2">
                    {/* Ícono a la izquierda */}
                    <div className="flex items-center">
                        <p className="text-xs text-yellow-400">
                            {task.id}
                        </p>
                        <IconButton aria-label="delete" size="small">
                            <KeyboardDoubleArrowRightIcon
                            fontSize="small"
                            className="text-yellow-400"
                            onClick={() => dropDown === true ? setDropDown(false) : setDropDown(true)}
                            />
                        </IconButton>
                    </div>
                    <div className="flex gap-2">

                        { editMode == false ? (
                            <>

                                <Chip label={data.status} color={data.status == 'pending' ? "warning" : (data.status == 'completed' ? "success" : "info")} />
                                <IconButton aria-label="edit" size="small">
                                    <EditIcon
                                        fontSize="small"
                                        className='text-yellow-400 iconCard'
                                        onClick={() => handleEditTask(task)}></EditIcon>
                                </IconButton>
                            </>
                            ) : (
                                <>
                                <FormControl variant="standard" sx={{ minWidth: '48%' }}>
                                    <InputLabel id="status-label">Status</InputLabel>
                                        <Select
                                            labelId="status-label"
                                            id="status"
                                            value={data.status || task.status}
                                            label="Status"
                                            onChange={e => setData('status', e.target.value)}
                                            >
                                                <Chip label={statusOptions.PENDING} value="pending" color="warning"/>
                                                <Chip label={statusOptions.INPROGRESS} value="in-progress" color="info"/>
                                                <Chip label={statusOptions.COMPLETED} value="completed" color="success"/>
                                        </Select>
                                    </FormControl>
                                <IconButton aria-label="save" size="small">
                                    <SaveIcon
                                        fontSize="small"
                                        className='text-yellow-400 iconCard'
                                        onClick={() => submitEditTask()}></SaveIcon>
                                    </IconButton>

                                <IconButton aria-label="cancel" size="small">
                                    <CloseIcon
                                        fontSize="small"
                                        className='text-red-400 iconCard'
                                        onClick={() => setEditMode(false)}></CloseIcon>
                                    </IconButton>
                                </>
                            )
                        }
                        <IconButton aria-label="delete" size="small">
                            <DeleteIcon
                                fontSize="small"
                                className='text-red-400 iconCard'
                                onClick={() => handleDeleteTask(task)}></DeleteIcon>
                            </IconButton>
                        </div>
                </div>
                {
                    dropDown ? (

                        <div className='p-2'>
                            { editMode ? (
                                <>
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
                                <div class="mb-2">
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
                                </div>
                                <div class="mb-2">
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
                                </>
                                ) : (
                                   <>
                                    <h5 className="text-md font-bold tracking-tight text-slate-950">
                                        {task.title}
                                    </h5>
                                    <h5 className="mb-2 text-xs italic font-light tracking-tight  text-gray-900">
                                        {task.category}
                                    </h5>
                                    <p className="text-xs text-gray-700">
                                        {task.description}
                                    </p>
                                </>
                                )
                            }
                        </div>
                    ) : null
                }
            </form>
            {/* <div className="flex h-6 justify-between items-center bg-slate-600 p-2">
                {/* Ícono a la izquierda
                <div className="flex items-center">
                        <p className="text-xs text-yellow-400">
                            {task.id}
                        </p>
                    <IconButton aria-label="delete" size="small">
                        <KeyboardDoubleArrowRightIcon
                        fontSize="small"
                        className="text-yellow-400"
                        onClick={() => dropDown === true ? setDropDown(false) : setDropDown(true)}
                        />
                    </IconButton>
                </div>
                <div className="flex gap-2">
                    <Chip label={task.status} color="success"/>
                    <IconButton aria-label="delete" size="small">
                        <EditIcon
                            fontSize="small"
                            className='text-yellow-400 iconCard'
                            onClick={() => props.updateTask(task)}></EditIcon>
                        </IconButton>
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon
                            fontSize="small"
                            className='text-red-400 iconCard'
                            onClick={() => handleDeleteTask(task)}></DeleteIcon>
                        </IconButton>
                    </div>
            </div>
                {
                    dropDown ? (
                        <div className='p-2'>
                            <h5 className="text-md font-bold tracking-tight text-slate-950">
                                {task.title}
                                </h5>
                            <h5 className="mb-2 text-xs italic font-light tracking-tight  text-gray-900">
                                {task.category}
                                </h5>
                            <p className="text-xs text-gray-700">
                                {task.description}
                                </p>
                        </div>
                    ) : null
                } */}
        </div>

    );
}
