import React, { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../../css/Panel.css';
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button, IconButton } from '@mui/material';
import { MdDelete } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { Chip } from '@mui/material';
import axios from 'axios';

export default function Panel(props) {

    console.log("PAnel props => ", props );
    const [task, setTask] = useState(props.task);
    console.log("PAnel task =>", task);

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
        project_id: props.project.id,
        title: task?.title || '',
        category: task?.category || '',
        status: task?.status || '',
        description: task?.description || '',
    })
    //CREATE NEW TASK
    const handleCreateTask = (task) => {
        post(route('task.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('title', 'category', 'status', 'description');
                props.updateList();
            },
            onError: (errors) => {
                console.log("Error Creating Task", errors)
            },
        });
    }

    // HANDLE DELETE TASK
    const handleDeletetask = (task) => {
        axios.delete(route('task.destroy', {task: task}))
        .then(response => {
            console.log(response);
            props.updateList();
        })
        .catch(error => {
            console.log(error);
        });
    }

    // HANDLE UPDATE TASK
    const handleUpdateTask = (task) => {
        axios.put(route('task.update', {task: task}), data)
        .then(response => {
            props.updateList();
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleClosePanel = () => {
        props.setOpen(false);
        reset({});
        console.log("Close Panel", task);
    }


  return (
    <div>
        <div class="panel">
            <div class="panel-header">
                <IoCloseCircleOutline size={30} onClick={() => handleClosePanel()} />
                <h2>Modal de tareas</h2>
                <div className='actions'>
                    <IconButton aria-label="success">
                        <BsCheckCircleFill className='btn-success' onClick={() => {task ? handleUpdateTask(task) : handleCreateTask(data)}} />
                    </IconButton>
                    {
                        task &&
                        <IconButton aria-label="delete">
                            <MdDelete className='btn-delete' onClick={() => handleDeletetask(task)}/>
                        </IconButton>
                    }
                </div>
            </div>
            <div class="panel-body">
                <div class="panel-item">
                    <TextField
                        id="outlined-basic"
                        label="Titulo"
                        variant="outlined"
                        className="input-title"
                        value={data.title || ''}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>
                <div class="panel-item">
                    <TextField
                        id="outlined-basic"
                        label="Descripción"
                        variant="outlined"
                        multiline
                        rows={4}
                        className="input-title"
                        value={data.description || ''}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>
                <div className='d-flex flex-row justify-between'>
                    <FormControl variant="standard" sx={{ minWidth: '40%' }}>
                        <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={data.category || ''}
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
                    <FormControl variant="standard" className='ms-4' sx={{ minWidth: '40%' }}>
                        <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status"
                                value={data.status || ''}
                                label="Status"

                                onChange={e => setData('status', e.target.value)}
                                >
                                    <Chip label={statusOptions.PENDING} value="pending" color="warning"/>
                                    <Chip label={statusOptions.INPROGRESS} value="in-progress" color="info"/>
                                    <Chip label={statusOptions.COMPLETED} value="completed" color="success"/>
                            </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    </div>
  )
}

