<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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

    // Update the current amount spent in the budget

    public function updateSpentAmount()
    {
        $startDate = match ($this->period) {
            'daily' => Carbon::now()->startOfDay(),
            'weekly' => Carbon::now()->startOfWeek(),
            'monthly' => Carbon::now()->startOfMonth(),
            default => null,
        };

        if ($startDate === null) {
            return response()->json(['error' => 'Invalid budget period'], 400);
        }


        $spentAmount = Transaction::where('category_id', $this->category_id)
            ->where('user_id', $this->user_id)
            ->where('type', 'expense')
            ->where('date', '>=', $startDate)
            ->sum('amount');

        $this->current_amount = $spentAmount;
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
