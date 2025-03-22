import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import './../../../css/Auth.css';

export default function Login() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        console.log('Login data => ', data);
    }, [data]);

    const handleLoginUser = () => {
        post(route('login'), {
            onSuccess: () => {
                console.log('User logged in successfully');
            },
            onError: (error) => {
                console.log('Error => ', error);
            }
        });
    }
    
    return (
        <div className='container-form'>
            <h1 class="text-2xl font-bold text-slate-900">Login</h1>
            <div class="grid grid-cols-1 gap-4">
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
                <button
                    onClick={() => handleLoginUser()}
                    class="bg-slate-900 text-white px-4 py-2 rounded"
                >
                    Login
                </button>
            </div>
            <h5 class="text-sm italic text-slate-500">This is your own second Brain</h5>
        </div>
    );
}
