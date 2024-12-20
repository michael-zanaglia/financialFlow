<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class SendFriendRequestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $receiverId;
    private $sender;
    /**
     * Create a new event instance.
     */
    public function __construct(int $contactId)
    {
        $this->receiverId = $contactId;
        $this->sender = Auth::id();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('friend-request.'.$this->receiverId),
        ];
    }
    public function broadcastAs() : string
    {
        return 'friend.request.event';
    }
    public function broadcastWith() : array
    {
        return [
            'sender'=> $this->sender,
        ];
    }
}
