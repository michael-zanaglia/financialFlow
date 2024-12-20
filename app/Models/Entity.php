<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Entity extends Model
{
    use HasFactory;

    const SECTEUR = [
        'Alimentaire', 
        'Multimedia', 
        'Accessoire', 
        'Automobile', 
        'Transport', 
        'Loisir', 
        'Privé', 
        'Autre',
        'Contact'
    ];

    public function fromable() : MorphMany
    {
        return $this->morphMany(Transaction::class, 'fromable');
    }

    public function toable() : MorphMany
    {
        return $this->morphMany(Transaction::class, 'toable');
    }
}
