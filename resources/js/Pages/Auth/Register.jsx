import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { TextField, Button, IconButton, InputAdornment, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import './../../../css/Auth.css';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegisterUser = () => {
        setRegisterError('');
        
        // Validaciones básicas
        if (!data.name || !data.email || !data.password || !data.password_confirmation) {
            setRegisterError('Todos los campos son obligatorios');
            return;
        }
        
        if (data.password !== data.password_confirmation) {
            setRegisterError('Las contraseñas no coinciden');
            return;
        }

        axios.post('/api/register', data)
            .then((response) => {
                console.log('User registered successfully', response.data);
                Inertia.visit('/login');
            })
            .catch((error) => {
                console.log('Error => ', error.response?.data || error.message);
                if (error.response?.data?.errors) {
                    // Mostrar el primer error encontrado
                    const errorMessages = Object.values(error.response.data.errors);
                    setRegisterError(errorMessages[0][0] || 'Error al registrar usuario');
                } else {
                    setRegisterError('Error al registrar usuario');
                }
            });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleRegisterUser();
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Crear cuenta</h1>
                    <p className="auth-subtitle">Regístrate para empezar a usar TaskManager</p>
                </div>
                
                <div className="auth-form">
                    {registerError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                            {registerError}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <TextField
                            id="name"
                            label="Nombre completo"
                            variant="outlined"
                            fullWidth
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            onKeyPress={handleKeyPress}
                            error={!!errors.name}
                            helperText={errors.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <TextField
                            id="email"
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            onKeyPress={handleKeyPress}
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <TextField
                            id="password"
                            label="Contraseña"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            onKeyPress={handleKeyPress}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <TextField
                            id="password_confirmation"
                            label="Confirmar contraseña"
                            variant="outlined"
                            fullWidth
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            onKeyPress={handleKeyPress}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    
                    <Button
                        onClick={handleRegisterUser}
                        variant="contained"
                        color="primary"
                        className="auth-button-primary"
                        fullWidth
                        disableElevation
                        disabled={processing}
                    >
                        Crear cuenta
                    </Button>
                    
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">¿Ya tienes una cuenta? </span>
                        <a href={route('login')} className="auth-link">Inicia sesión</a>
                    </div>
                </div>
                
                <div className="auth-footer">
                    <p className="logo-text text-blue-600">Task<span className="text-indigo-600">Manager</span></p>
                    <p className="mt-1">Tu segunda mente para gestionar tareas</p>
                </div>
            </div>
        </div>
    );
}
