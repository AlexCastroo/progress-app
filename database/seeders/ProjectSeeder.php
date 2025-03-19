<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Sprint;
use App\Models\Task;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $projects = Project::factory()->count(3)->create();

        foreach($projects as $project){
            $sprints = Sprint::factory()->count(3)->create([
                'project_id' => $project->id,
                'start_date' => $faker->dateTimeBetween($project->start_date, $project->start_date->modify('+'.rand(1, 8).' days')),
                'end_date' => $faker->dateTimeBetween($project->start_date, $project->start_date->modify('+'.rand(3, 6).' weeks')),
            ]);
            foreach($sprints as $sprint){
                $sprint->update([
                    'start_date' => $faker->dateTimeBetween($project->start_date, $project->start_date->modify('+'.rand(1, 5).' days')),
                    'end_date' => $faker->dateTimeBetween($sprint->start_date, $sprint->start_date->modify('+'.rand(3, 6).' weeks')),
                    'start_at' => $faker->dateTimeBetween($sprint->start_date, $sprint->start_date->modify('+'.rand(5, 8).' days')),
                    'total_days' => $sprint->end_date->diff($sprint->start_date)->days,
                ]);
            }
                foreach($sprints as $sprint){
                    $tasks = Task::factory()->count(5)->create([
                        'sprint_id' => $sprint->id,
                        'project_id' => $project->id,
                    ]);

                    // foreach($tasks as $task){
                    //     $start_date = $faker->dateTimeBetween($sprint->start_date, $sprint->start_date->modify('+'.rand(1, 5).' days'));
                    //     $task->update([
                    //         'start_at' => $start_date,
                    //         'end_at' => $task->status == 'completed' ? $faker->dateTimeBetween($start_date, $start_date->modify('+'.rand(30, 256).' minutes')) : null,
                    //         //'end_at' => $faker->dateTimeBetween($start_date, $start_date->modify('+'.rand(30, 256).' minutes')),
                    //     ]);
                    // }
                }
        }
    }
}
