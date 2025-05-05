# Laravel Inertia React Routes Documentation

## Overview

This directory contains the route definitions for the Laravel Inertia React application. The routes are organized into three main files:

- [api.php](api.md): Defines API endpoints for the application
- [web.php](web.md): Defines web routes that render pages using Inertia.js
- [console.php](console.md): Defines Artisan commands for the console

## Quick Navigation

| Route Type | File | Main Purpose |
|------------|------|-------------|
| API Routes | [api.php](api.md) | RESTful endpoints for the application's backend |
| Web Routes | [web.php](web.md) | Routes for web pages, rendered with Inertia.js + React |
| Console Commands | [console.php](console.md) | CLI commands for the application |

## Project Structure

The application appears to be a project management system with the following features:

- User authentication (login, register, email verification)
- Project management
- Sprint planning
- Task tracking
- Time logging for tasks

## Authentication

The application uses Laravel Sanctum for API authentication. Public routes are protected with appropriate middleware.

## Key Controllers

The following controllers are used throughout the routes:

- `AuthController`: Handles user authentication
- `ProjectController`: Manages projects
- `SprintController`: Manages sprints
- `TaskController`: Manages tasks
- `TaskTimeLogController`: Handles time tracking for tasks
- `DashboardController`: Manages the user dashboard

## Development Notes

- Several TODOs are present in the codebase, indicating planned improvements
- Some routes in the API file are commented out but implemented in the web routes file
- The application uses named routes for easier reference in controllers and views