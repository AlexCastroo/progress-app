<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listProjects = Project::all();

        $motivationalQuotes = json_decode(file_get_contents(resource_path('data/motivational.json')), true);
        $randomQuote = $motivationalQuotes[array_rand($motivationalQuotes)];

        return Inertia::render('Projects/ProjectList', [
            'projects' => $listProjects,
            'motivationalQuote' => $randomQuote
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->all());
        return redirect()->route('project.list')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $projectTasks = $project->tasks()->get();

        return Inertia::render('Projects/Project', [
            'project' => $project,
            'tasks' => $projectTasks
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }

    public function getListProjects(Project $project)
    {
        $projectList = $project->all();
        return response()->json($projectList);
    }

    public function projectTasks(Project $project)
    {
        $tasks = $project->tasks()->get();
        return Inertia::render('Projects/ProjectTasks', [
            'project' => $project,
            'tasks' => $tasks
        ]);
    }

    public function projectStats(Project $project)
    {
        $tasks = $project->tasks()->get();
        $totalTasks = $tasks->count();
        $completedTasks = $tasks->where('status', 'completed')->count();
        $pendingTasks = $tasks->where('status', 'pending')->count();

        return Inertia::render('Projects/ProjectStats', [
            'project' => $project,
            'totalTasks' => $totalTasks,
            'completedTasks' => $completedTasks,
            'pendingTasks' => $pendingTasks
        ]);
    }

    public function projectGoals(Project $project)
    {
        $tasks = $project->tasks()->get();
        $completedProjects = $tasks->where('status', 'completed')->count();
        $pendingProjects = $tasks->where('status', 'pending')->count();

        return Inertia::render('Projects/ProjectGoal', [
            'project' => $project,
            'completedProjects' => $completedProjects,
            'pendingProjects' => $pendingProjects
        ]);
    }
}
