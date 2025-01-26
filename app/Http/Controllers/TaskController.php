<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Task\StoreRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $taskList = Task::all();
        return Inertia::render('Home', ['taskList' => $taskList]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //return Inertia::render('Tasks/TaskCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Creamos la tarea con Eloquent
        Task::create($request->all());
        // Redireccionamos a la vista principal con un mensaje
        return redirect()->route('task.index')->with('message', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        try {
            // Actualizar la tarea
            $task->update($request->all());
        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json([
                'error' => 'Failed to update task.',
                'message' => $e->getMessage()
            ], 500);  // Responde con error (código HTTP 500)
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try {
            // Eliminar la tarea
            $task->delete();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete task.',
                'message' => $e->getMessage()
            ], 500);  // Responde con error (código HTTP 500)
        }
    }

    public function getTasksList()
    {
        $taskList = Task::all();
        return response()->json($taskList);
    }



}
