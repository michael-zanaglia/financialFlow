<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Entity;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Entity::factory(12)
        ->create()
        ->each(function ($entity) {
            $users = User::inRandomOrder()->take(5)->get();
            
            foreach($users as $user){
                Transaction::factory()->create([
                    'amount'=> fake()->randomFloat(2,1,1000),
                    'fromable_id' => $user->id, 
                    'fromable_type' => $user::class,    
                    'toable_id' => $entity->id,    
                    'toable_type' => $entity::class,
                ]);

                Transaction::factory()->create([
                    'amount'=> fake()->randomFloat(2,1,1000),
                    'fromable_id' => $entity->id, 
                    'fromable_type' => $entity::class,    
                    'toable_id' => $user->id,    
                    'toable_type' => $user::class,
                ]);
            }
        });
        
    }
}
