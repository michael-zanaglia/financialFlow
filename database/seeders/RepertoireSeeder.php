<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\Factories\RepertoireFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RepertoireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(range(1,3) as $index){
            $user_id = User::inRandomOrder()->first()->id;
            DB::table('repertoires')->insert([
                'user_id'=> $user_id,
                'friend_id'=> User::where('id', '!=', $user_id)->inRandomOrder()->first()->id,
            ]);  
        }       
    }
}
