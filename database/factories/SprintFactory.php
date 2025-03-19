<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class SprintFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 month', 'now');
        $endDate = $this->faker->dateTimeBetween($startDate, strtotime('+1 month'));
        return [
            'title' => $this->faker->name,
            'description' => $this->faker->text,
            'end_at' => null,
            'is_paused' => $this->faker->boolean,
            'status' => 'active',
        ];
    }
}
