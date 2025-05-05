# ProjectController Documentation

## Overview

The `ProjectController` handles all project-related operations in the Laravel Inertia React application. It manages the creation, listing, retrieval, and display of projects, along with project-specific views like tasks, statistics, and goals.

## Methods

### index()

**Route:** `GET /projects`  
**Name:** `projects`  
**Middleware:** `auth:sanctum`

Displays a list of all projects for the authenticated user. This serves as the main project listing page rendered with Inertia.

### store()

**Route:** `POST /project`  
**Name:** `project.store`  
**Middleware:** `auth:sanctum`

Creates a new project in the database. Accepts project details through the request and validates them before saving.

### show(Project $project = null)

**Route:** `GET /projects/{project?}`  
**Name:** `project.show`  
**Middleware:** `auth:sanctum`

Shows detailed information for a specific project. The project parameter is optional, allowing for a "new project" view when no project is specified.

### getListProjects()

**Route:** `GET /getProjectList`  
**Name:** `getProjectList`  
**Middleware:** `auth:sanctum`

Returns a simplified list of projects, typically used for populating dropdown selections in forms.

### projectTasks(Project $project)

**Route:** `GET /projects/{project}/tasks`  
**Name:** `project.tasks`

Displays all tasks associated with a specific project. This is likely rendered as a dedicated task management view.

### projectStats(Project $project)

**Route:** `GET /projects/{project}/stats`  
**Name:** `project.stats`

Shows statistical data and metrics for a specific project, such as progress, completion rates, or time tracking information.

### projectGoals(Project $project)

**Route:** `GET /projects/{project}/goals`  
**Name:** `project.goals`

Displays the goals and objectives associated with a specific project.

## Input Validation

While the actual validation rules aren't visible without the controller source, typical validation for projects might include:

- Project name (required, string, max length)
- Description (optional, string)
- Start date and end date (dates, proper sequence)
- Status (from predefined list)
- User assignments (existing user IDs)

## Response Format

The controller likely returns:

- Inertia responses for web routes (`index`, `show`, `projectTasks`, `projectStats`, `projectGoals`)
- JSON responses for API endpoints (`getListProjects`)
- Redirects after create/update operations (`store`)

## Related Models

Based on the route structure, this controller likely interacts with:

- `Project` model (primary)
- `Task` model (through relationships)
- `Sprint` model (through relationships)
- `User` model (for assignments and permissions)

## Development Notes

There is a TODO comment in the routes files to "Complete CRUD operations for projects", suggesting that some standard operations (update, delete) may not be fully implemented yet.