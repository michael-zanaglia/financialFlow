<?php

namespace App\Actions\User;

use App\Models\User;

class GetUserFullname 
{
    public function get(int $id){
        $user = User::where("id", $id)->select("name", "firstname")->first();
        if($user) {
            $fullname = $user->firstname." ".$user->name;
            return $fullname;
        }
        return null;
    }
}