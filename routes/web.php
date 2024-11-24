<?php

use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return Inertia::render('Home', [
        'name' => 'John Doe',
        'age' => 29,
        'success' => session('success'),
    ]);
})->name('home');

Route::post('/tasks', [TaskController::class, 'store'])->name('task.store');
Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('task.update');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
Route::get('/tasks-list', [TaskController::class, 'index'])->name('task.index');
