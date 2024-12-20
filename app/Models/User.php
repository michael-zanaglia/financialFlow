<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

//implements MustVerifyEmail

class User extends Authenticatable
{
    use HasApiTokens;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    

    protected $fillable = [
        'name',
        'firstname',
        'email',
        'solde',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, "role_id");
    }
    public function history(): HasOne
    {
        return $this->hasOne(User_history::class, "user_id");
    }

    public function friends(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "repertoires", "user_id", "friend_id")
                    ->withPivot("created_at");
    }
    public function allFriends(): Collection
    {
        $friends = $this->friends()->get();
        $reversed = $this->belongsToMany(User::class, "repertoires", "friend_id", "user_id")
                        ->withPivot("created_at")
                        ->get();
        
        $merged = $friends->merge($reversed);
        return $merged;
    }

    public function fromable() : MorphMany
    {
        return $this->morphMany(Transaction::class, 'fromable');
    }
    public function toable() : MorphMany
    {
        return $this->morphMany(Transaction::class, 'toable');
    }
    public function scopeSearch($query, string|null $search)
    {
        if(empty($search)){
            return $query;
        }
        return $query->where(function ($query) use ($search){
            $search = trim($search);                                                 
            $splittedWords = preg_split("/\s+/", $search, -1, PREG_SPLIT_NO_EMPTY); // aucune limit, supprime les chaine vide du tableau
        
            $query->where(function ($subQuery) use ($splittedWords){
                foreach($splittedWords as $word){
                    $subQuery->where(function ($wordQuery) use ($word){
                        $wordQuery->where('name', 'like', "%$word%")
                                ->orWhere('firstname', 'like', "%$word%");
                    });
                }
            });   
        });
    }
}
