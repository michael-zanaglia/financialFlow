<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use App\Actions\UserHistory\GetUserHistory;

class PageController extends Controller
{
    public function actionSend()
    {   
        $friends = User::find(Auth::id())
                        ->allFriends();
        return Inertia::render('ActionSend', [
            "friends" => $friends
        ]);
    }

    public function actionSendPost(Request $request)
    {   
        if($request->id){
            $friends = User::find(Auth::id())
                            ->allFriends();
            foreach($friends as $contact){
                if($contact->id === (int)$request->id){
                    return Inertia::render('ActionSend', [
                        "contact" => $contact,
                        "friends" => $friends
                    ]);
                }
            }
        }
        return Inertia::render('ActionSend');
    }
    
    public function actionHistory(GetUserHistory $getUserHistory)
    {
        $userHistory = $getUserHistory->get(Auth::id());
        return Inertia::render('ActionHistory',[
            "userHistory" => $userHistory ? json_decode($userHistory->history, true) : null,
        ]);
    }
    
    public function contacts()
    {
        $contacts = User::find(Auth::user()->id)
                    ->allFriends()
                    ->paginate(5);  
       
        return Inertia::render('Contacts',[
            'contacts'=> $contacts,
        ]);
    }

    public function addContact()
    {   
        return Inertia::render('AddContact');
    }

    public function profile()
    {
        return Inertia::render('Profile/Profile');
    }
}
