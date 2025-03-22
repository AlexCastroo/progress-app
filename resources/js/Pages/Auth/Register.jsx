import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import './../../../css/Auth.css';
export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleRegisterUser = () => {
        post(route('register'), {
            onSuccess: () => {
                console.log('User registered successfully');
            },
            onError: (error) => {
                console.log('Error => ', error);
            }
        });
    }
    useEffect(() => {
        console.log('Register data => ', data);
    }, [data]);

    return (
        <div class="container-form">
            <h1 class="text-2xl font-bold text-slate-900">Register</h1>
            <div class="grid grid-cols-1 gap-4">
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <TextField
                    id="password_confirmation"
                    label="Confirm Password"
                    variant="outlined"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />
                <button
                    onClick={() => handleRegisterUser()}
                    class="bg-slate-900 text-white px-4 py-2 rounded"
                >
                    Register
                </button>
            </div>
            <h5 class="text-sm italic text-slate-500">This is your own second Brain</h5>
        </div>
    );
}
