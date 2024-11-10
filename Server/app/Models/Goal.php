<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'target_amount',
        'start_date',
        'end_date',
        'category_id',
    ];

    public function updateSavedAmount()
    {
        $savedAmount = Transaction::where('category_id', $this->category_id)
            ->where('user_id', $this->user_id)
            ->where('type', 'income')
            ->where('date', '>=', $this->start_date)
            ->where('date', '<=', $this->end_date)
            ->sum('amount');

        $this->current_amount = $savedAmount;
        $this->save();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
