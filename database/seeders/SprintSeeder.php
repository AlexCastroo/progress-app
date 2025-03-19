<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sprint;

class SprintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected $model = Sprint::class;

    public function run(): void
    {
        //Crear 5 sprints
        //Sprint::factory()->count(5)->create();
    }
}
