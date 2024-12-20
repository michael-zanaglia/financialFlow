<?php

namespace App\Actions\UserHistory;

use App\Models\User;
use App\Models\User_history;

Class GetUserHistory
{
    public function get(int $id) 
    {
        $findUser= User::find($id);
        if ($findUser) {
            $userHistoric = User_history::where('user_id', $id)->first();
            return $userHistoric;
        } else {
            return null;  
        }   
    }


}