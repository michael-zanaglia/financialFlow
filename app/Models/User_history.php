<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User_history extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'history'];
    protected $guarded = [];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
