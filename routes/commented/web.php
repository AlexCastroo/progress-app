<?php
/**
 * @file web.php
 * @brief Web routes definition for the Laravel Inertia React application
 * @details This file contains all the web routes for pages, authentication flows, and project management
 * @author Application Developer
 * @date Created: Unknown
 * @version 1.0
 */

use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskTimeLogController;


/**
 * @brief Root route
 * @details Returns a simple text string
 * @return string Simple text response
 */
Route::get('/', function () {
    return 'Laravel AUTH API';
});

/**
 * @defgroup PublicAuthPages Public Authentication Pages
 * @brief Routes for authentication pages accessible without login
 * @{
 */
Route::middleware('web')->group(function () {
    /**
     * @brief Login page route
     * @details Renders the login page using Inertia
     * @return \Inertia\Response Rendered React component
     */
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    /**
     * @brief Registration page route
     * @details Renders the registration page using Inertia
     * @return \Inertia\Response Rendered React component
     */
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

/**
 * @brief Email verification page route
 * @details Renders the email verification page using Inertia
 * @return \Inertia\Response Rendered React component
 */
Route::get('/verify-email', function () {
    return Inertia::render('Auth/VerifyEmail');
});

/**
 * @brief Forgot password page route
 * @details Renders the password reset request page using Inertia
 * @return \Inertia\Response Rendered React component
 */
Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
});
/** @} */ // End of PublicAuthPages group

/**
 * @defgroup ProtectedRoutes Protected Routes
 * @brief Routes that require authentication
 * @details All routes within this group are protected by the auth:sanctum middleware
 * @{
 */
Route::middleware(['auth:sanctum'])->group(function () {
    /**
     * @brief Project listing page
     * @details Shows all projects for the authenticated user
     * @return \Inertia\Response Rendered React component
     */
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');

    /**
     * @brief Create new project
     * @details Stores a new project in the database
     * @return \Illuminate\Http\RedirectResponse Redirect to projects page
     */
    Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
    // TODO: Completar CRUD proyectos
    
    /**
     * @brief Show project details
     * @details Returns details for a specific project
     * @param Project $project Optional project model instance
     * @return \Inertia\Response Rendered React component
     */
    Route::get('/projects/{project?}', [ProjectController::class, 'show'])->name('project.show');
    
    /**
     * @brief Get project list for dropdowns
     * @details Returns a simplified list of projects for select fields
     * @return \Illuminate\Http\JsonResponse JSON response with projects
     */
    Route::get('getProjectList', [ProjectController::class, 'getListProjects'])->name('getProjectList');

    /**
     * @brief Create new sprint
     * @details Stores a new sprint in the database
     * @return \Illuminate\Http\RedirectResponse Redirect to sprints page
     */
    // TODO: Completar CRUD sprints
    Route::post('/sprint', [SprintController::class, 'store'])->name('sprint.store');
    
    /**
     * @brief Get sprint list
     * @details Returns a list of sprints for dropdowns
     * @return \Illuminate\Http\JsonResponse JSON response with sprints
     */
    Route::get('getSprintList', [SprintController::class, 'getListSprints'])->name('getSprintList');

    /**
     * @brief Create new task
     * @details Stores a new task in the database
     * @return \Illuminate\Http\RedirectResponse Redirect to tasks page
     */
    Route::post('/tasks', [TaskController::class, 'store'])->name('task.store');
    
    /**
     * @brief Update existing task
     * @details Updates a task's information
     * @param Task $task The task model instance
     * @return \Illuminate\Http\JsonResponse Status of the update
     */
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('task.update');
    
    /**
     * @brief Delete task
     * @details Removes a task from the database
     * @param Task $task The task model instance
     * @return \Illuminate\Http\JsonResponse Status of the deletion
     */
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
    //Route::get('/tasks-list', [TaskController::class, 'index'])->name('task.index');
    
    /**
     * @brief Get tasks for project
     * @details Returns all tasks for a specific project
     * @param Project $project The project model instance
     * @return \Illuminate\Http\JsonResponse JSON response with tasks
     */
    Route::get('/getTasksList/{project}', [TaskController::class, 'getTasksList'])->name('getTasksList');
    
    /**
     * @brief Manage task time tracking
     * @details Start, pause, or complete task time tracking
     * @param Task $task The task model instance
     * @param string $action The action to perform (start, pause, complete)
     * @return \Illuminate\Http\JsonResponse Time log information
     */
    Route::post('/start-task/{task}/{action}', [TaskTimeLogController::class, 'actionTaskLog'])->name('task.action');

});
/** @} */ // End of ProtectedRoutes group

/**
 * @defgroup ProjectViews Project View Routes
 * @brief Routes for project-specific views
 * @{
 */

/**
 * @brief Project tasks view
 * @details Shows all tasks for a specific project
 * @param Project $project The project model instance
 * @return \Inertia\Response Rendered React component
 */
Route::get('/projects/{project}/tasks', [ProjectController::class, 'projectTasks'])->name('project.tasks');

/**
 * @brief Project statistics view
 * @details Shows statistics and metrics for a specific project
 * @param Project $project The project model instance
 * @return \Inertia\Response Rendered React component
 */
Route::get('/projects/{project}/stats', [ProjectController::class, 'projectStats'])->name('project.stats');

/**
 * @brief Project goals view
 * @details Shows goals and objectives for a specific project
 * @param Project $project The project model instance
 * @return \Inertia\Response Rendered React component
 */
Route::get('/projects/{project}/goals', [ProjectController::class, 'projectGoals'])->name('project.goals');
/** @} */ // End of ProjectViews group

/**
 * @brief Dashboard route
 * @details Shows the user dashboard with overview information
 * @return \Inertia\Response Rendered React component
 */
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
