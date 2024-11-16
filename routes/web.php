<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'name' => 'John Doe',
        'age' => 29,
    ]);
});

// Route::inertia('/', 'Home');
