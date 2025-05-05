import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { TextField, Button, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './../../../css/Auth.css';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { useThemeContext } from './../../Theme/ThemeContext';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

export default function Login() {
    const { toggleTheme } = useThemeContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginUser = () => {
        setLoginError('');
        axios.post('/api/login', data)
            .then((response) => {
                console.log('User logged in successfully', response);
                Inertia.visit('/projects');
            })
            .catch((error) => {
                console.log('Error => ', error.response?.data || error.message);
                setLoginError('Credenciales incorrectas. Por favor, intenta de nuevo.');
            });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLoginUser();
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Bienvenido</h1>
                    <p className="auth-subtitle">Inicia sesión para continuar</p>
                </div>
                
                <div className="auth-form">
                    {loginError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                            {loginError}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <TextField
                            id="email"
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
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
                    
                    <div className="flex justify-between items-center mb-4">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    color="primary"
                                    size="small"
                                />
                            }
                            label={<span className="text-sm text-gray-600">Recordarme</span>}
                        />
                        <a href="#" className="auth-link">¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <Button
                        onClick={handleLoginUser}
                        variant="contained"
                        color="primary"
                        className="auth-button-primary"
                        fullWidth
                        disableElevation
                        disabled={processing}
                    >
                        Iniciar sesión
                    </Button>
                    
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">¿No tienes una cuenta? </span>
                        <a href={route('register')} className="auth-link">Regístrate</a>
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
