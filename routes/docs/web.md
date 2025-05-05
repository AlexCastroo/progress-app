# Web Routes Documentation

## Overview

This file defines all the web routes for the Laravel Inertia React application. It includes routes for pages, authentication flows, and project/task management. Many routes use Inertia.js for rendering React components.

## Routes Structure

### Public Routes

| Method | URI | Handler | Description |
|--------|-----|---------|-------------|
| GET | `/` | Anonymous function | Returns a simple text string "Laravel AUTH API" |

### Authentication Routes

| Method | URI | Handler | Name | Description |
|--------|-----|---------|------|-------------|
| GET | `/login` | Inertia::render('Auth/Login') | login | Shows login page |
| GET | `/register` | Inertia::render('Auth/Register') | register | Shows registration page |
| GET | `/verify-email` | Inertia::render('Auth/VerifyEmail') | - | Email verification page |
| GET | `/forgot-password` | Inertia::render('Auth/ForgotPassword') | - | Password reset request page |

### Authenticated Routes (Protected by auth:sanctum)

| Method | URI | Controller | Name | Description |
|--------|-----|-----------|------|-------------|
| GET | `/projects` | ProjectController@index | projects | Project listing page |
| POST | `/project` | ProjectController@store | project.store | Create new project |
| GET | `/projects/{project?}` | ProjectController@show | project.show | Show project details |
| GET | `/getProjectList` | ProjectController@getListProjects | getProjectList | Get project list for dropdown |
| POST | `/sprint` | SprintController@store | sprint.store | Create new sprint |
| GET | `/getSprintList` | SprintController@getListSprints | getSprintList | Get sprint list |
| POST | `/tasks` | TaskController@store | task.store | Create new task |
| PUT | `/tasks/{task}` | TaskController@update | task.update | Update existing task |
| DELETE | `/tasks/{task}` | TaskController@destroy | task.destroy | Delete task |
| GET | `/getTasksList/{project}` | TaskController@getTasksList | getTasksList | Get tasks for project |
| POST | `/start-task/{task}/{action}` | TaskTimeLogController@actionTaskLog | task.action | Manage task time tracking |

### Project-specific Routes

| Method | URI | Controller | Name | Description |
|--------|-----|-----------|------|-------------|
| GET | `/projects/{project}/tasks` | ProjectController@projectTasks | project.tasks | View tasks for a project |
| GET | `/projects/{project}/stats` | ProjectController@projectStats | project.stats | View project statistics |
| GET | `/projects/{project}/goals` | ProjectController@projectGoals | project.goals | View project goals |

### Dashboard Route

| Method | URI | Controller | Name | Description |
|--------|-----|-----------|------|-------------|
| GET | `/dashboard` | DashboardController@index | dashboard | User dashboard page |

## Usage Notes

- The web routes use Inertia.js to render React components, creating a seamless SPA experience.
- Protected routes use the `auth:sanctum` middleware to ensure user authentication.
- There are several TODO comments indicating planned improvements to the CRUD operations.
- Project management includes tasks, sprints, and time tracking functionality.