<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;
    public function fromable() : MorphTo
    {
        return $this->morphTo();
    }

    public function toable() : MorphTo
    {
        return $this->morphTo();
    }
}
