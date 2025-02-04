<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Notifications\GoalReached;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'target_amount',
        'start_date',
        'category_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function checkAndNotify()
    {
        if ($this->current_amount >= $this->target_amount) {
            $this->user->notify(new GoalReached($this));
        }
    }
}
