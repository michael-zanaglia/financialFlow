<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SearchFriend 
{
    public function execute(string|null $search, string $order='desc'){
        $userId = Auth::user()->id;
        
        return User::whereIn('id', function($query) use ($userId) {
            $query->select('user_id')
                  ->from('repertoires')
                  ->where('friend_id', '=', $userId)
                  ->union(
                    DB::table("repertoires")
                        ->select('friend_id')
                        ->where('user_id', '=', $userId)
                  );
        })
       ->orderBy("id", $order)
       ->search($search)
       ->paginate(5)
       ->onEachSide(1)
       ->withQueryString();
    }
}