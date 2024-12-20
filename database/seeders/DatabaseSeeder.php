<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Transaction;
use App\Models\User_history;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // $json = json_encode([
        //     [
        //         'to' => '',
        //         'date' => '1688212401',
        //         'from' => 'Cultura',
        //         'amount' => '5.00'
        //     ],
        //     [
        //         'to' => 'Fnac',
        //         'date' => '1719834801',
        //         'from' => '',
        //         'amount' => '251.99'
        //     ],
        //     [
        //         'to' => 'Ebay',
        //         'date' => '1728388401',
        //         'from' => '',
        //         'amount' => '97.99'
        //     ],
        //     [
        //         'to' => '',
        //         'date' => '1728820401',
        //         'from' => 'Auchan',
        //         'amount' => '20.05'
        //     ],
        //     [
        //         'to' => '',
        //         'date' => '1728906801',
        //         'from' => 'Prive',
        //         'amount' => '30.00'
        //     ],
        //     [
        //         'to' => 'Contact',
        //         'date' => '1731585201',
        //         'from' => '',
        //         'amount' => '500.10'
        //     ]
        // ]);

        // Table Role--
        $this->call(RoleSeeder::class);

       User::factory(10)->create();

       User::factory()->create([
           'email' => env('USER_MAIL'),
           'password' => Hash::make(env('USER_PWD')),
           'role_id' => 1,
       ]);

       // Table Entity--
       $this->call(EntitySeeder::class);

       // Table Transaction--
       $this->call(TransactionSeeder::class);

       // Table UserHistoryFactory--
    //    $this->call(User_historySeeder::class);
    //    User_history::factory()->create([
    //     'user_id'=> User::find(11)->id,
    //     'history'=> $json
    //    ]);

       // Table Pivot repertoire--
       $this->call(RepertoireSeeder::class);
       foreach(range(1,8) as $index){
            $user_id = 11;
            DB::table('repertoires')->insert([
                'user_id'=> $user_id,
                'friend_id'=> User::where('id', '!=', $user_id)->inRandomOrder()->first()->id,
            ]);  
        }   
    }
}
