<?php

namespace App\Http\Controllers;

use App\Models\TaskTimeLog;
use App\Models\Task;
use Illuminate\Http\Request;
use Debugbar;
use Carbon\Carbon;

class TaskTimeLogController extends Controller
{

    /**
     * Start the task for first time
     */
    public function actionTaskLog(Request $request, Task $task, $action)
    {
        $taskLog = TaskTimeLog::create([
            'task_id' => $task->id,
            'action' => $action,
            'timestamp' => Carbon::now('Europe/Madrid'),
        ]);

        $action == 'start' ? $status = 'in-progress' : ($action == 'pause' ? $status = 'paused' : ($action == 'resume' ? $status = 'in-progress' : $status = 'completed'));
        Task::findOrfail($task->id)->update([
            'status' => $status,
            'total_time' => $this->calculateTaskTime($task),
        ]);
        return response()->json(['message' => $action == 'start' ? 'Task started' : ($action == 'pause' ? 'Task paused' : ($action == 'resume' ? 'Task resumed' : 'Task completed'))]);
    }

    /**
     * Get the task time logs
     */
    public function calculateTaskTime(Task $task)
    {
        $taskTimeLogs = TaskTimeLog::where('task_id', $task->id)->orderBy('timestamp')->get();

        $totalTime = 0;
        $startTime = null;
        $pauseTime = null;

        foreach ($taskTimeLogs as $taskTimeLog) {
            $timestamp = strtotime($taskTimeLog->timestamp);
            switch ($taskTimeLog->action) {
                case 'start':
                case 'resume':
                    $startTime = $timestamp;
                    break;
                case 'pause':
                case 'finish':
                    if ($startTime) {
                    $totalTime += $timestamp - $startTime;
                    $startTime = null; // Reset start time
                    }
                    break;
                }
        }

        return $totalTime;
    }
}
