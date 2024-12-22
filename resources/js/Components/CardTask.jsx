import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Chip } from '@mui/material';
import moment from 'moment';

// Componentes propios
//import CheckToggle from './CheckToggle';

export default function CardTask ({...props}) {

    const [dropDown, setDropDown] = useState(true);
    const task = props.task;

    //
    return (
        
        <div
            href="#"
            className="block max-w-lg mb-4 bg-slate-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100  overflow-hidden"
        >            
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
                            onClick={() => props.deleteTask(task)}></DeleteIcon>
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
                }
            
        </div>

    );
}