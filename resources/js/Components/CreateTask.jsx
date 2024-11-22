import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function CreateTask({...props}) {
    
    return (
        
        <a href="#" className="block max-w-lg p-6 bg-slate-700 bg-opacity-20 border border-gray-200 rounded-lg shadow">
            
            <h5 
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create Task
                </h5>
                {/* FOrmualrio con los campos de titulo y descripcion en tailwind con estilos slate oscuros */}
                <form>
                <div className="mb-2">
                    <TextField
                        id="id"
                        label="Id"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-2">
                    <TextField
                        id="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mb-2">
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div>
                    <Button
                        type="button"
                        onSubmit={props.handleCreate}
                        variant="contained"
                        color="primary"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </a>
    );
}