<?php

namespace App\Actions\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DeleteFriend 
{
    public function execute(string $id){
        try {
            $deleted = DB::table('repertoires')
                        ->where(function($query) use ($id){
                            $query->where('friend_id', $id)
                            ->orWhere('user_id', $id);
                        })
                        ->where(function($query){
                            $query->where('user_id', Auth::id())
                            ->orWhere('friend_id', Auth::id());
                        })                        
                        ->delete();
            
            if ($deleted) {
                return response()->json([
                    "message" => "Relation supprimée avec succès.",
                    "status" => 200
                ], 200);
            } else {
                return response()->json([
                    "message" => "Aucune relation trouvée à supprimer.",
                    "status" => 404
                ], 404);
            }
        } catch(\Exception $e){
            return response()->json(["msg"=>"Erreur lors de la suppression", "error"=>$e->getMessage(), "status"=>401], 401);  
        }
    }
}