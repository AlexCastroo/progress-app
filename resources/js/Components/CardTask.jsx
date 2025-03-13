import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { FaRegEye } from "react-icons/fa";

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

export default function CardTask ( props, showTask ) {

    const [dropDown, setDropDown] = useState(true);
    const [task, setTask] = useState(props.task);

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
