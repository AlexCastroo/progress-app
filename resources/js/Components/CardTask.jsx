import * as React from 'react';
import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { FaRegEye } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

import moment from 'moment-timezone';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Chip } from '@mui/material';
import axios from "axios";
import { useForm } from '@inertiajs/react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../css/CardTask.css';

export default function CardTask ( props, showTask, updateList ) {

    moment.tz('Europe/Madrid');


    const [dropDown, setDropDown] = useState(true);
    const [task, setTask] = useState(props.task);
    const [taskTimeLog, setTaskTimeLog] = useState(null);
    const actionStatusMap = {
        'start': 'started',
        'resume': 'started',
        'pause': 'paused',
        'finish': 'completed'
    };
    const handleTimeTask = (id, action) => {
        axios.post(route('task.action', { task: id, action: action }))
            .then(response => {
                console.log("Task Time", response.data);
                setTaskTimeLog(actionStatusMap[action] || taskTimeLog);
                (action == 'finish' || action == 'pause') && props.updateList();
            })
            .catch(error => {
                console.log("Error Task Time", error);
            });
    }

    return (
        <div
            href="#"
            class="card-task"
        >
            <form>
                {
                    dropDown ? (
                        <div>
                            <div class="content-card">
                                   <h5 className="title-card" onClick={() => dropDown === true ? setDropDown(false) : setDropDown(true)}>
                                        {task.title}
                                    </h5>
                                    <h5 className="catgeory-card">
                                        {task.category}
                                    </h5>
                                    <p className="desc-card">
                                        {task.description}
                                    </p>
                                    <h3 className="desc-card">
                                        {moment.utc(task.total_time * 1000).format('HH:mm:ss')}
                                    </h3>
                                    {
                                        taskTimeLog != 'completed' ? (
                                            taskTimeLog == null && (task.status == 'in-progress' || task.status == 'paused') ? (
                                                    <FaCirclePlay className='text-green-600' onClick={() => handleTimeTask(task.id, 'start')}/>
                                            ) : (
                                                taskTimeLog == 'started' ? (
                                                    <>
                                                        <FaCirclePause className='text-red-600' onClick={() => handleTimeTask(task.id, 'pause')}/>
                                                        <IoCheckmarkDoneCircle className='text-green-600' onClick={() => handleTimeTask(task.id, 'finish')}/>
                                                    </>
                                                    ) : ( taskTimeLog == 'paused' ? (
                                                        <FaCirclePlay className='text-green-600' onClick={() => handleTimeTask(task.id, 'resume')}/>
                                                    ) : null
                                                )
                                            )
                                        ) : null
                                    }

                                    {/* <Chip className='badge-status' variant='outlined' size='small' label={data.status} color={data.status == 'pending' ? "warning" : (data.status == 'completed' ? "success" : "info")} /> */}
                            </div>
                            <div className="actions-card">
                                    <EditIcon
                                        fontSize="small"
                                        className='text-sky-950 iconCard'
                                        onClick={() => props.showTask()}></EditIcon>
                                    <FaRegEye
                                        fontSize="small"
                                        className='text-sky-950 iconCard'
                                        onClick={() => showTask()}></FaRegEye>
                                    <DeleteIcon
                                        fontSize="small"
                                        className='text-red-600 iconCard'
                                        onClick={() => showTask()}></DeleteIcon>
                                </div>
                            </div>
                    ) : (
                        <h5 className="title-card p-2 w-100" onClick={() => dropDown === true ? setDropDown(false) : setDropDown(true)}>
                            {task.title}
                        </h5>
                    )
                }
            </form>
        </div>

    );
}
