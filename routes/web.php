<?php

use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\HomeController;


Route::get('/', [TaskController::class, 'index']);


Route::post('/tasks', [TaskController::class, 'store'])->name('task.store');
Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('task.update');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
Route::get('/tasks-list', [TaskController::class, 'index'])->name('task.index');
Route::get('getTasksList', [TaskController::class, 'getTasksList'])->name('getTasksList');
