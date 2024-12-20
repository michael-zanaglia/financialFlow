<?php

namespace App\Listeners;

use Illuminate\Support\Carbon;
use App\Events\AcceptFriendEvent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Actions\Redis\DeleteRedisFriend;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class AcceptFriendListener
{
    /**
     * Create the event listener.
     */
    private $authId;
    private $deleteRedisFriend;
    public function __construct(DeleteRedisFriend $deleteRedisFriend)
    {
        $this->authId = Auth::id();
        $this->deleteRedisFriend = $deleteRedisFriend;
    }

    /**
     * Handle the event.
     * @var bool $sender
     */
    public function handle(AcceptFriendEvent $event): void
    {
        $key = "friend_request:".$this->authId;
        $sender = $this->deleteRedisFriend->delete($key, $event->contactId);
        if($sender){
            DB::table('repertoires')
            ->insert([
                ['user_id'=>  $event->contactId, 'friend_id' => $this->authId, 'created_at' => Carbon::now()],
            ]);
        }
    }
}
