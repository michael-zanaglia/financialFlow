<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', static function (User $user, int $id) {
    return (int)$user->id === $id;
});


Broadcast::channel('friend-request.{receiverId}', function (User $user, int $receiverId) {
    return (int) $user->id === (int) $receiverId;
});
