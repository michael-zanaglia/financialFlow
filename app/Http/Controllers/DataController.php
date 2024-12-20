<?php

namespace App\Http\Controllers;

use App\Actions\Redis\CheckPendingRequest;
use App\Actions\Redis\DeleteRedisFriend;
use App\Actions\User\DeleteFriend;
use Exception;
use App\Models\User;
use App\Models\Entity;
use Illuminate\Http\Request;
use App\Actions\User\Transaction;
use Illuminate\Http\JsonResponse;
use App\Actions\User\SearchFriend;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Actions\User\GetUserFullName;
use App\Actions\UserHistory\GetUserHistory;
use App\Actions\UserHistory\CreateNewHistory;
use App\Events\AcceptFriendEvent;
use App\Events\SendFriendRequestEvent;
use App\Jobs\SendFriendRequestJob;
use Illuminate\Support\Facades\Redis;

class DataController extends Controller
{
    public function getUserData(int $id, GetUserHistory $getUserHistory): JsonResponse
    {
        $userHistory = $getUserHistory->get($id);
        if($userHistory){
            return response()->json($userHistory, 201);
        }
        return response()->json(['msg'=>'Il n\'y a aucun historique.'],401);
    }

    public function getEntities(): JsonResponse
    {
        $entities= Entity::all();

        if($entities->isEmpty()){
            return response()->json(["message"=>"Pas de résultat"], 201);
        }
        return response()->json($entities, 201); 
    }

    public function updateHistoryUser(Request $request, GetUserHistory $getUserHistory, CreateNewHistory $createNewHistory, Transaction $transaction, GetUserFullName $getUserFullName): JsonResponse
    {
        $userSolde = User::find(Auth::id());
        if(Auth::check() && $userSolde->solde >= $request->amount){

            
            try {
                $from = $request->from;
                $to = $request->to;
                $amount = $request->amount;
                // update le solde des concernés
                $transaction->handle($from, $to, $amount);
                
                // Get l'historique de mes utilisateurs
                $userHistoric = $getUserHistory->get($from);
                $receiverHistoric = $getUserHistory->get($to);
                
                // Si je n'ai pas d'historique j'en cree un pour mon utilisateur
                if(!$userHistoric){
                    $userHistoric = $createNewHistory->create($from);
                }
                if(!$receiverHistoric){
                    $receiverHistoric = $createNewHistory->create($to);
                }
                
                // Je decode mon json si j'ai deja un historique sinon j'en creer un 
                $historyData = $userHistoric->history ? json_decode($userHistoric->history, true) : [];
                $receiverHistoryData = $receiverHistoric->history ? json_decode($receiverHistoric->history, true) : [];

                // je prepare mon nouvel objet et je l'ajoute à l'historique des utilisateurs
                $newHistory = [
                    "to" => $to,
                    "toName" => $getUserFullName->get($to),
                    "fromName" => $getUserFullName->get($from),
                    "from" => $from,
                    "amount"=> $amount,
                    "date" => now()->timestamp,
                ];
                
                $historyData[] = $newHistory;
                $receiverHistoryData[] = $newHistory;

                // Je l'encode pour ensuite l'enregistrer dans la DB
                $userHistoric->history = json_encode($historyData);
                $receiverHistoric->history = json_encode($receiverHistoryData);
                $userHistoric->save();
                $receiverHistoric->save();
                
                DB::commit();
                return response()->json(["msg"=>"Envoyé", "status"=>201], 201);  

            } catch(\Exception $e) {
                DB::rollBack();
                return response()->json(["msg"=>"Erreur lors de la transaction", "error"=>$e->getMessage(), "status"=>401], 401);  
            }
               
        }

        return response()->json(["msg"=> "Utilisateur non connecté", "status"=>401],401);
    }

    public function searchFriend(Request $request, SearchFriend $searchFriend)
    {
        $result = $searchFriend->execute($request->search);
        return response()->json($result, 201);
    }

    public function searchContact(Request $request, CheckPendingRequest $checkPendingRequest)
    {
        $mail = $request->mail;
        if($mail && $mail !== Auth::user()->email){
            $found = User::select('id', 'name', 'firstname', 'email', 'profile_photo_path')
                ->where('email', $mail)
                ->first();
            if($found){
                $friends = User::find(Auth::id())->allFriends();
                foreach($friends as $friend){
                    if($friend->id === $found->id){
                        return response()->json([
                            "found"=>$found,
                            "note"=>"Ami"
                        ], 201);
                    };
                }
                return $checkPendingRequest->check($found->id, $found);  
            }
        }
    }

    public function sendRequest(Request $request, CheckPendingRequest $checkPendingRequest){
        $contactId = $request->id;
        $contact = User::find($contactId) ;
        event(new SendFriendRequestEvent($contactId));
        return $checkPendingRequest->check($contactId, $contact);  
        // return response()->json(["msg"=>"Demande envoyé", "status"=>201], 201);
    }

    public function deleteFriend(string $id, DeleteFriend $deleteFriend)
    {
        return $deleteFriend->execute(($id));
    }
    public function friendList()
    {
        $list = Redis::lrange("friend_request:".Auth::id(), 0, -1);

        $returnUsers = array();
        foreach($list as $req){
            $decodeReq = json_decode($req);
            $sender =  User::find($decodeReq->sender);
            if($sender){
                array_push($returnUsers, $sender);
            }
            
        }
        return response()->json($returnUsers, 201);
    }
    public function acceptFriend(Request $request)
    {
        $contactId = $request->id;
        event(new AcceptFriendEvent($contactId));
        return response()->json(["msg"=>'OK', "status"=>201], 201);
    }

    public function refuseFriend(Request $request, DeleteRedisFriend $deleteRedisFriend)
    {
        $contactId = $request->id;
        $redisKey = "friend_request:".Auth::id();
        $validate = $deleteRedisFriend->delete($redisKey, $contactId);

        if($validate){
            return response()->json(["msg"=>'OK', "status"=>201], 201);
        }
        
        
    }
}

