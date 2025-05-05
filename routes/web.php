<?php

use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskTimeLogController;



Route::get('/', function () {
    return 'Laravel AUTH API';
});

Route::middleware('web')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

Route::get('/verify-email', function () {
    return Inertia::render('Auth/VerifyEmail');
});

Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');

    // PROYECTS ROUTES
    Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
    // TODO: Completar CRUD proyectos
    Route::get('/projects/{project?}', [ProjectController::class, 'show'])->name('project.show');
    Route::get('getProjectList', [ProjectController::class, 'getListProjects'])->name('getProjectList');

    // SPRINT ROUTES
    // TODO: Completar CRUD sprints
    Route::post('/sprint', [SprintController::class, 'store'])->name('sprint.store');
    Route::get('getSprintList', [SprintController::class, 'getListSprints'])->name('getSprintList');

    // TASKS ROUTES
    Route::post('/tasks', [TaskController::class, 'store'])->name('task.store');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('task.update');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
    //Route::get('/tasks-list', [TaskController::class, 'index'])->name('task.index');
    Route::get('/getTasksList/{project}', [TaskController::class, 'getTasksList'])->name('getTasksList');
    // Task_time_logs
    Route::post('/start-task/{task}/{action}', [TaskTimeLogController::class, 'actionTaskLog'])->name('task.action');

});

Route::get('/projects/{project}/tasks', [ProjectController::class, 'projectTasks'])->name('project.tasks');
Route::get('/projects/{project}/stats', [ProjectController::class, 'projectStats'])->name('project.stats');
Route::get('/projects/{project}/goals', [ProjectController::class, 'projectGoals'])->name('project.goals');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

