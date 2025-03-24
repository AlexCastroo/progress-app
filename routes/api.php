<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Fortify;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Habilitar autenticación SPA
Route::post('/login', [AuthController::class, 'login'])->middleware('web');
Route::post('/register', [AuthController::class, 'register'])->middleware('web');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/email/verify/{id}/{hash}', [AuthController::class, 'emailVerify'])->name('verification.verify');
// Solo los usuarios logeados podrán usar esta ruta
Route::post('/resend-email-verify', [AuthController::class, 'resendEmailVerificationMail'])->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('web');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('web')->name('password.reset');

Route::middleware(['auth:sanctum'])->group(function () {

    // PROYECTS ROUTES
    Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
    // TODO: Completar CRUD proyectos
    Route::get('/projects/{project?}', [ProjectController::class, 'show'])->name('project.show');
    Route::get('/projects', [ProjectController::class, 'index'])->name('project.list');
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
