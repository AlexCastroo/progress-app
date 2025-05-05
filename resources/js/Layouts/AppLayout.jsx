import React, { useEffect } from 'react';
import DashboardList from '@/Components/DashboardList';
import { Grid } from '@mui/material';
import { useThemeContext } from '../Theme/ThemeContext'; // Importar el hook useThemeContext
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';


function AppLayout({ children, project }) {
    const { toggleTheme } = useThemeContext(); // Obtener la función para cambiar el tema

    useEffect(() => {
        console.log("App Layout EFECT => ", children);
    }, [children]);

    const { data, post } = useForm();
    const handleLogout = () => {
        axios.post('/api/logout')
            .then((response) => {
                console.log('User logged out successfully', response.data);
                Inertia.visit('login');
            })
            .catch((error) => {
                console.log('Error => ', error.response?.data || error.message);
            });
    }

    return (
        <html lang="en" className="h-full">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
                <title>Document</title>
            </head>
            <body className="h-full flex flex-col">
                    <header className="bg-slate-800 text-white">
                        <div className="container mx-auto p-4 flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold">My Total App</h1>
                                <h5 className="text-xs font-light">Created by Alex Castro</h5>
                            </div>
                            <button
                                onClick={() => handleLogout()}
                                className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none"
                            >
                                Logout
                            </button>
                            {/* Botón para cambiar el tema */}
                            <button
                                onClick={toggleTheme}
                                className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none"
                            >
                                Toggle Theme
                            </button>
                        </div>
                    </header>

                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <DashboardList project={project} />
                        </Grid>
                        <Grid item xs={10}>
                            {children}
                        </Grid>
                    </Grid>
            </body>
        </html>
    );
}

export default React.memo(AppLayout);
