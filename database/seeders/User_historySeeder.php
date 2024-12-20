<?php

namespace Database\Seeders;

use App\Models\User_history;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class User_historySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User_history::factory(6)->create();
    }
}
