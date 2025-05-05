<?php
/**
 * @file api.php
 * @brief API routes definition for the Laravel Inertia React application
 * @details This file contains all the API endpoints for authentication, projects, sprints, tasks, and time logging
 * @author Application Developer
 * @date Created: Unknown
 * @version 1.0
 */

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskTimeLogController;


/**
 * @brief Returns the authenticated user
 * @param Request $request The HTTP request object
 * @return \Illuminate\Http\JsonResponse User object
 * @note Protected by sanctum auth middleware
 */
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


/**
 * @defgroup Authentication Authentication Routes
 * @brief Routes for user authentication and account management
 * @{
 */

/**
 * @brief User login endpoint
 * @details Authenticates users and returns tokens for API access
 */
Route::post('/login', [AuthController::class, 'login'])->middleware('web');

/**
 * @brief User registration endpoint
 * @details Creates new user accounts
 */
Route::post('/register', [AuthController::class, 'register'])->middleware('web');

/**
 * @brief User logout endpoint
 * @details Invalidates user tokens
 */
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

/**
 * @brief Email verification endpoint
 * @details Verifies user email addresses via verification links
 */
Route::post('/email/verify/{id}/{hash}', [AuthController::class, 'emailVerify'])->name('verification.verify');

/**
 * @brief Resend verification email endpoint
 * @details Sends a new verification email to the user
 * @note Only authenticated users can use this route
 */
Route::post('/resend-email-verify', [AuthController::class, 'resendEmailVerificationMail'])->middleware('auth:sanctum');

/**
 * @brief Password reset request endpoint
 * @details Sends password reset links to user email
 */
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('web');

/**
 * @brief Password reset confirmation endpoint
 * @details Processes password reset requests with valid tokens
 */
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('web')->name('password.reset');
/** @} */ // End of Authentication group

/**
 * @defgroup ProjectManagement Project Management Routes (Currently Commented)
 * @brief Routes for managing projects, sprints, tasks and time logs
 * @details These routes are currently commented out in the code
 * @note All routes would be protected by auth:sanctum middleware
 * @{
 */

// Route::middleware(['auth:sanctum'])->group(function () {

//     // PROYECTS ROUTES
//     /**
//      * @brief Create new project
//      * @details Stores a new project in the database
//      */
//     Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
//     // TODO: Completar CRUD proyectos
//     /**
//      * @brief Show project details
//      * @details Returns details for a specific project
//      * @param Project $project Optional project model instance
//      */
//     Route::get('/projects/{project?}', [ProjectController::class, 'show'])->name('project.show');
//     /**
//      * @brief List all projects
//      * @details Returns a paginated list of all projects
//      */
//     Route::get('/projects', [ProjectController::class, 'index'])->name('project.list');
//     /**
//      * @brief Get project list for dropdowns
//      * @details Returns a simplified list of projects for select fields
//      */
//     Route::get('getProjectList', [ProjectController::class, 'getListProjects'])->name('getProjectList');

//     // SPRINT ROUTES
//     // TODO: Completar CRUD sprints
//     /**
//      * @brief Create new sprint
//      * @details Stores a new sprint in the database
//      */
//     Route::post('/sprint', [SprintController::class, 'store'])->name('sprint.store');
//     /**
//      * @brief Get sprint list
//      * @details Returns a list of sprints for dropdowns
//      */
//     Route::get('getSprintList', [SprintController::class, 'getListSprints'])->name('getSprintList');

//     // TASKS ROUTES
//     /**
//      * @brief Create new task
//      * @details Stores a new task in the database
//      */
//     Route::post('/tasks', [TaskController::class, 'store'])->name('task.store');
//     /**
//      * @brief Update existing task
//      * @details Updates a task's information
//      * @param Task $task The task model instance
//      */
//     Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('task.update');
//     /**
//      * @brief Delete task
//      * @details Removes a task from the database
//      * @param Task $task The task model instance
//      */
//     Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
//     //Route::get('/tasks-list', [TaskController::class, 'index'])->name('task.index');
//     /**
//      * @brief Get tasks for project
//      * @details Returns all tasks for a specific project
//      * @param Project $project The project model instance
//      */
//     Route::get('/getTasksList/{project}', [TaskController::class, 'getTasksList'])->name('getTasksList');
//     // Task_time_logs
//     /**
//      * @brief Manage task time tracking
//      * @details Start, pause, or complete task time tracking
//      * @param Task $task The task model instance
//      * @param string $action The action to perform (start, pause, complete)
//      */
//     Route::post('/start-task/{task}/{action}', [TaskTimeLogController::class, 'actionTaskLog'])->name('task.action');

// });
/** @} */ // End of ProjectManagement group
