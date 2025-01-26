import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Create } from "@mui/icons-material";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useForm } from '@inertiajs/react'


const TaskCreate = () => {
    return(
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
                            id="id"
                            name="id"
                            label="Id"
                            value={data.id}
                            onChange={e => setData('id', e.target.value)}
                            variant="standard"
                            fullWidth
                            />
                        </div>
                    <div class="mb-2">
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            variant="standard"
                            fullWidth
                            />
                        </div>
                    <div class="mb-8">
                        <TextField
                            id="title"
                            name="description"
                            label="Description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            variant="standard"
                            fullWidth
                        />
                        </div>
                        <button type="submit" class="bg-slate-700 text-white p-2 rounded-lg">Create</button>
                        {/* {
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
                        } */}

                </form>
        </div>
    );
};
