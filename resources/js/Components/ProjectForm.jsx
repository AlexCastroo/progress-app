import React from 'react'
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function ProjectForm() {
  const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('project.store')), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Project Created");
            },
            onError: (errors) => {
                console.log("Error Creating Project", errors);
            },
        }
    };

    return (
        <>
        <div class="d-felx flex-col w-96 p-4 bg-slate-200 bg-opacity-20 border border-gray-200 rounded-lg shadow">
                <form onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            variant="standard"
                            fullWidth
                        />
                        {errors.name && <div>{errors.name}</div>}
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            variant="standard"
                            fullWidth
                        />
                        {errors.description && <div>{errors.description}</div>}
                        <button type="submit" class="bg-slate-700 text-white p-2 rounded-lg">Create</button>
                </form>
            </div>
        </>
  )
}
