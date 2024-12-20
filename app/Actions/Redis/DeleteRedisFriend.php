<?php

namespace App\Actions\Redis;

use Illuminate\Support\Facades\Redis;

class DeleteRedisFriend 
{
    public function delete(string $key, string $contact, string $decodeKey='sender') : bool
    {
        $listFriends = Redis::lrange($key, 0, -1);
        foreach($listFriends as $friend){
            $decodeFriend = json_decode($friend, true);
            if((string)$decodeFriend[$decodeKey] === (string)$contact){
                Redis::lrem($key, 0, $friend);
                return true;
            }
        }
        return false;
    }
}