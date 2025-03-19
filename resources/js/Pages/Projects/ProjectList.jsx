import React from 'react'
import { useState, useEffect } from 'react';
import { CgAddR } from "react-icons/cg";
import { Inertia } from '@inertiajs/inertia';
// Stylesheets
import '../../../css/ProjectList.css';
import axios from 'axios';

import { useForm } from '@inertiajs/inertia-react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { use } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProjectList( props ) {

    console.log(props);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('project.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('name', 'description');
            },
            onError: (errors) => {
                console.log("Error Creating Project", errors)
            },
        });
    }

    useEffect(() => {
        console.log("Projects => ", data);
    }, [data]);




    const handleProjectClick = (project) => {
        console.log(project);
        Inertia.visit(`/projects/${project.id}`);
    }

    return (
        <>
            <div class="motivational-quote">
                <h1>{props.motivationalQuote}</h1>
            </div>
            <div class="container-projects">
                <div class="project-list">
                    {props.projects?.map((project) => (
                        <div class="card" key={project.id} onClick={() => handleProjectClick(project)}>
                            <h5 class="card-title">{project.name}</h5>
                            <p class="card-text">{project.description}</p>
                        </div>
                    ))}
                </div>

                <button class="icon-btn" onClick={() => handleOpen()}>
                    <CgAddR class="react-icon" />
                        Añadir nuevo proyecto
                    </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    ¡Crea tu nuevo proyecto!
                </Typography>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <TextField
                                    id="name"
                                    label="Título"
                                    variant='outlined'
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="description"
                                    label="Descripción"
                                    variant='outlined'
                                    value={data.description || ''}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary">
                                Crear Proyecto
                            </Button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </>

    )
}

export default ProjectList
