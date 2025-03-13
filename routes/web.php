<?php

use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;


Route::get('/', [HomeController::class, 'index']);

Route::post('/tasks', [TaskController::class, 'store'])->name('task.store');
Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('task.update');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
//Route::get('/tasks-list', [TaskController::class, 'index'])->name('task.index');
Route::get('/getTasksList/{project}', [TaskController::class, 'getTasksList'])->name('getTasksList');

Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
Route::get('/projects', [ProjectController::class, 'index'])->name('project.list');
Route::get('getProjectList', [ProjectController::class, 'getListProjects'])->name('getProjectList');

//
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('project.show');
Route::get('/projects/{project}/tasks', [ProjectController::class, 'projectTasks'])->name('project.tasks');
Route::get('/projects/{project}/stats', [ProjectController::class, 'projectStats'])->name('project.stats');
Route::get('/projects/{project}/goals', [ProjectController::class, 'projectGoals'])->name('project.goals');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
