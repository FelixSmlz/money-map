<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'limit',
        'period',
        'start_date',
        'category_id',
        'custom_period'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}