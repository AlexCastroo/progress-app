# Console Routes Documentation

## Overview

This file defines console commands (Artisan commands) for the Laravel Inertia React application. Currently, it only includes the default "inspire" command that comes with Laravel.

## Commands

### Inspire Command

| Command | Description | Schedule |
|---------|-------------|----------|
| `inspire` | Displays an inspiring quote in the console | Runs hourly |

## Usage Notes

- The `inspire` command uses Laravel's built-in `Inspiring` class to generate quotes.
- The command is registered to run automatically on an hourly schedule.
- This file is the standard location for registering custom Artisan commands.
- To execute the inspire command manually, run `php artisan inspire` in the terminal.

## Adding New Commands

To add new custom console commands to the application:

1. Define the command in this file using the `Artisan::command()` method
2. Specify a purpose using the `->purpose()` method
3. Set a schedule if needed (e.g., `->hourly()`, `->daily()`, etc.)

Example:
```php
Artisan::command('app:cleanup', function () {
    // Command logic here
})->purpose('Clean up temporary files')->daily();
```