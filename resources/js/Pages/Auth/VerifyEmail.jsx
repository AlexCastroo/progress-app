import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import './../../../css/Auth.css';

export default function VerifyEmail() {

    return (
        <div class="container-form">
            <h1 class="text-2xl font-bold text-slate-900">Verify Email</h1>
            <div class="grid grid-cols-1 gap-4">
                <h2>Please verify your email address</h2>
            </div>
            <h5 class="text-sm italic text-slate-500">This is your own second Brain</h5>
        </div>
    );
}
