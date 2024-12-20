<?php

namespace Database\Factories;

use App\Models\Entity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first()->id;
        $entity = Entity::inRandomOrder()->first()->id;
        return [
            'amount' => $this->faker->randomFloat(2, 1, 1000), // Montant aléatoire
            'fromable_id' => $this->faker->randomElement([$user, $entity]),
            'fromable_type' => $this->faker->randomElement([User::class, Entity::class]),
            'toable_id' => $this->faker->randomElement([$user, $entity]),
            'toable_type' => $this->faker->randomElement([User::class, Entity::class]), 
        ];
    }
}
