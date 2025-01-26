import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useForm } from '@inertiajs/react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';


export default function TaskForm( props ) {

    const initialTask = {
        title: "",
        category: "",
        status: "",
        description: "",
    }

    const [task, setTask] = useState(initialTask);
    const [openForm, setOpenForm] = useState(false);

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

    function submit(e) {
        e.preventDefault()
        // Peticion POST a la
        post(route('task.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('title', 'category', 'status', 'description'),
                props.updateList();
            },
            onError: (errors) => {
                console.log("Error Creating Task", errors)
            },
        });
    }

    return (
        <>
            { !openForm ? (
                <AddCircleOutlineIcon onClick={setOpenForm} />
            ) : (
                <div class="col-span-1 p-4 h-80 bg-slate-200 bg-opacity-20 border border-gray-200 rounded-lg shadow">
                    <CloseIcon onClick={() => setOpenForm(false)} />
                    <h3 class="text-lg font-bold text-slate-700">
                        Create task
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
                                    <button type="submit" class="bg-slate-700 text-white p-2 rounded-lg">Create</button>
                        </form>
                </div>
                )
            }
        </>
    );
}


