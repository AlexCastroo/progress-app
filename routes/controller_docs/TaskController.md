# TaskController Documentation

## Overview

The `TaskController` manages task-related operations within the Laravel Inertia React application. It's responsible for creating, updating, deleting, and listing tasks that are associated with projects.

## Methods

### store()

**Route:** `POST /tasks`  
**Name:** `task.store`  
**Middleware:** `auth:sanctum`

Creates a new task in the database. This method likely accepts task details such as title, description, status, assignee, priority, and project association.

### update(Task $task)

**Route:** `PUT /tasks/{task}`  
**Name:** `task.update`  
**Middleware:** `auth:sanctum`

Updates an existing task's information. The task is automatically injected via Laravel's route model binding, allowing direct manipulation of the task object.

### destroy(Task $task)

**Route:** `DELETE /tasks/{task}`  
**Name:** `task.destroy`  
**Middleware:** `auth:sanctum`

Deletes a specific task from the database. The task is automatically injected via Laravel's route model binding.

### getTasksList(Project $project)

**Route:** `GET /getTasksList/{project}`  
**Name:** `getTasksList`  
**Middleware:** `auth:sanctum`

Returns a list of all tasks associated with a specific project. This is typically used for AJAX requests to populate task lists in the UI.

### index() (Commented out)

**Route:** `GET /tasks-list`  
**Name:** `task.index`  
**Middleware:** `auth:sanctum`

This method appears to be commented out in the routes, but would likely return a complete list of tasks, possibly with filtering options.

## Input Validation

While the actual validation rules aren't visible without the controller source, typical validation for tasks might include:

- Title (required, string, max length)
- Description (optional, string)
- Status (from predefined list)
- Priority (from predefined list)
- Due date (valid date)
- Project association (valid project ID)
- Assignee (valid user ID)

## Response Format

The controller likely returns:

- JSON responses for API calls (all methods appear to be used via API)
- Status indicators for update/delete operations
- Complete task data for creation responses
- Collections of tasks for listing methods

## Related Models

Based on the route structure, this controller interacts with:

- `Task` model (primary)
- `Project` model (for association)
- `User` model (for assignments)
- Potentially `Sprint` model (for timeline organization)

## Development Notes

The listing method (`index`) is currently commented out in the routes, suggesting that task listing might be handled differently, possibly through the project-specific views.