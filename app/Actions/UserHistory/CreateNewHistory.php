<?php

namespace App\Actions\UserHistory;
use App\Models\User_history;

class CreateNewHistory
{
    public function create(int $userId){
        $newHistory = new User_history();
        $newHistory->user_id = $userId;
        return $newHistory;
    }
}