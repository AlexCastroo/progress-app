import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/inertia-react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { use } from 'react';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Project( props ) {
    const project = props.project;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sprint.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({});
            },
            onError: (errors) => {
                console.log("Error Creating Project", errors)
            },
        });
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        project_id: project.id,
        title: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    useEffect(() => {
        console.log("Sprint => ", data);
    }, [data]);

  return (
    <AppLayout project={project}>
        <div>Project Summary - Coming soon...</div>
        <div>
        <Button onClick={handleOpen}>Crear Sprint</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <TextField
                        id="title"
                        label="Título"
                        variant='outlined'
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
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
                <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker onChange={(value) => setData('start_date', moment(value).format('YYYY-MM-DD HH:mm:ss'))} />
                    <DatePicker onChange={(value) => setData('end_date', moment(value).format('YYYY-MM-DD HH:mm:ss'))}/>
                </DemoContainer>
                </LocalizationProvider>
                <Button type="submit" variant="contained" color="primary">
                    Crear Proyecto
                </Button>
            </form>
            </Box>
        </Modal>
        </div>
    </AppLayout>
  )
}
