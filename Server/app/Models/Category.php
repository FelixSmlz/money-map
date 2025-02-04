<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color_code',
        'icon_name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function goals()
    {
        return $this->hasMany(Goal::class)->nullOnDelete();
    }

    public function budgets()
    {
        return $this->hasMany(Budget::class)->nullOnDelete();
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class)->nullOnDelete();
    }
}
