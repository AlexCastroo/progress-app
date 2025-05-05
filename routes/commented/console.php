<?php
/**
 * @file console.php
 * @brief Console commands definition for the Laravel Inertia React application
 * @details This file contains Artisan command definitions that can be run from the CLI
 * @author Laravel Framework / Application Developer
 * @date Created: Unknown
 * @version 1.0
 */

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/**
 * @brief Display an inspiring quote
 * @details This command outputs a random inspiring quote in the console
 * @note This is the default example command that ships with Laravel
 * @return void
 */
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();
