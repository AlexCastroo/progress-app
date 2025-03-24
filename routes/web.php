<?php

use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskTimeLogController;
use App\Http\Controllers\SprintController;


Route::get('/', function () {
    return 'Laravel AUTH API';
});

// Dashboard routes
Route::get('/projects/{project}/tasks', [ProjectController::class, 'projectTasks'])->name('project.tasks');
Route::get('/projects/{project}/stats', [ProjectController::class, 'projectStats'])->name('project.stats');
Route::get('/projects/{project}/goals', [ProjectController::class, 'projectGoals'])->name('project.goals');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

