<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'date_of_birth',
        'phone_number',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'profile_picture',
        'currency',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
