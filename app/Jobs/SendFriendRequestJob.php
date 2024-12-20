<?php

namespace App\Jobs;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendFriendRequestJob implements ShouldQueue
{
    use Queueable, Dispatchable,InteractsWithQueue, SerializesModels;

    protected $receiverId;
    protected $userId;
    protected int $maxTime;
    /**
     * Create a new job instance.
     */
    public function __construct($receiverId)
    {
        $this->receiverId = $receiverId;
        $this->userId = Auth::id();
        $this->maxTime = 60*60*24*7;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $key = "friend_request:{$this->receiverId}";

        $senderReq = json_encode([
            'sender'=>$this->userId,
            'receiver'=>$this->receiverId
        ]);

        Redis::lpush($key, $senderReq);
        Redis::expire($key, $this->maxTime);
    }
}
