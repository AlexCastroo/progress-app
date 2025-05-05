# API Routes Documentation

## Overview

This file defines all the API routes for the Laravel Inertia React application. It includes routes for authentication, projects, sprints, tasks, and task time logging.

## Routes Structure

### Authentication Routes

| Method | URI | Controller | Description | Middleware |
|--------|-----|-----------|-------------|------------|
| GET | `/user` | Anonymous function | Returns the authenticated user | auth:sanctum |
| POST | `/login` | AuthController@login | User login endpoint | web |
| POST | `/register` | AuthController@register | User registration endpoint | web |
| POST | `/logout` | AuthController@logout | User logout endpoint | auth:sanctum |
| POST | `/email/verify/{id}/{hash}` | AuthController@emailVerify | Email verification endpoint | - |
| POST | `/resend-email-verify` | AuthController@resendEmailVerificationMail | Resend verification email | auth:sanctum |
| POST | `/forgot-password` | AuthController@forgotPassword | Password reset request | web |
| POST | `/reset-password` | AuthController@resetPassword | Password reset confirmation | web |

### Project Routes (Commented out)

All project routes are currently commented out but would be protected by the `auth:sanctum` middleware.

| Method | URI | Controller | Name | Description |
|--------|-----|-----------|------|-------------|
| POST | `/project` | ProjectController@store | project.store | Create new project |
| GET | `/projects/{project?}` | ProjectController@show | project.show | Show project details |
| GET | `/projects` | ProjectController@index | project.list | List all projects |
| GET | `/getProjectList` | ProjectController@getListProjects | getProjectList | Get project list for dropdown |

### Sprint Routes (Commented out)

| Method | URI | Controller | Name | Description |
|--------|-----|-----------|------|-------------|
| POST | `/sprint` | SprintController@store | sprint.store | Create new sprint |
| GET | `/getSprintList` | SprintController@getListSprints | getSprintList | Get sprint list |

### Task Routes (Commented out)

| Method | URI | Controller | Name | Description |
|--------|-----|-----------|------|-------------|
| POST | `/tasks` | TaskController@store | task.store | Create new task |
| PUT | `/tasks/{task}` | TaskController@update | task.update | Update existing task |
| DELETE | `/tasks/{task}` | TaskController@destroy | task.destroy | Delete task |
| GET | `/getTasksList/{project}` | TaskController@getTasksList | getTasksList | Get tasks for project |

### Task Time Log Routes (Commented out)

| Method | URI | Controller | Name | Description |
|--------|-----|-----------|------|-------------|
| POST | `/start-task/{task}/{action}` | TaskTimeLogController@actionTaskLog | task.action | Manage task time tracking |

## Usage Notes

- The API routes use various controllers for handling different aspects of the application.
- All routes that handle user data are protected by appropriate middleware.
- There are several TODO comments indicating planned improvements to the CRUD operations.
- Many routes are currently commented out in the codebase.