<?php

namespace App\Actions\Redis;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class CheckPendingRequest 
{
    public function check(int $foundId, mixed $found){
        $keys = ["friend_request:{$foundId}", "friend_request:".Auth::id()];
                $state = null;
                foreach($keys as $key){
                    $waitingReqs = Redis::lrange($key, 0, -1);
                    foreach($waitingReqs as $req){
                        $decodeReq = json_decode($req, true);
                        if($decodeReq["sender"] === $foundId){
                            $state="Vous a demandé en ami";
                        } else if($decodeReq["receiver"] === $foundId) {
                            $state="Demande envoyée";
                        } 
                    }
                }
                return response()->json([
                    "found"=>$found,
                    "note"=>$state,
                ], 201);
    }
}