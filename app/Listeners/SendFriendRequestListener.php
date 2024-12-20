<?php

namespace App\Listeners;

use App\Jobs\SendFriendRequestJob;
use Illuminate\Support\Facades\Auth;
use App\Events\SendFriendRequestEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendFriendRequestListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SendFriendRequestEvent $event): void
    {
        SendFriendRequestJob::dispatch($event->receiverId);
    }
}
