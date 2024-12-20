<?php

namespace App\Actions\User;

use App\Models\User;

class Transaction 
{
    public function handle(int $from, int $to, float $amount) 
    {
        $userSolde = User::find($from);
        $receiverSolde = User::find($to);

        $userSolde->solde -= $amount;
        $receiverSolde->solde += $amount;
        $userSolde->save();
        $receiverSolde->save();
    }
}