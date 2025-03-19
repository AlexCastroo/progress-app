<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\Project;


class HomeController extends Controller
{
    public function index()
    {
        $tasksList = Task::all();
        $projectsList = Project::all();
        return Inertia::render('Home', [
            'tasks' => $tasksList,
            'projects' => $projectsList
        ]);
    }
}
