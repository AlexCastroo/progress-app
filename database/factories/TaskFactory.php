<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->name,
            'description' => $this->faker->text,
            'category' => $this->faker->word,
            'priority' => $this->faker->randomElement(['0', '1', '2', '3']),
            'status' => $this->faker->randomElement(['pending', 'in-progress', 'paused', 'completed']),
        ];
    }
}
