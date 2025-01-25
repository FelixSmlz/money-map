<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Budget;
use Carbon\Carbon;

class ResetBudgets extends Command
{
    protected $signature = 'budgets:reset';
    protected $description = 'Reset budget amounts and update days left';

    public function handle()
    {
        $budgets = Budget::all();

        foreach ($budgets as $budget) {
            $endDate = match ($budget->period) {
                'daily' => Carbon::parse($budget->start_date)->endOfDay(),
                'weekly' => Carbon::parse($budget->start_date)->endOfWeek(),
                'monthly' => Carbon::parse($budget->start_date)->endOfMonth(),
                'custom' => Carbon::parse($budget->start_date)->addDays($budget->custom_period),
                default => null,
            };

            if ($endDate) {
                $budget->days_left = now()->startOfDay()->diffInDays($endDate, false);

                if ($budget->days_left <= 0) {
                    $budget->current_amount = 0;
                    $budget->start_date = match ($budget->period) {
                        'daily' => Carbon::now()->startOfDay(),
                        'weekly' => Carbon::now()->startOfWeek(),
                        'monthly' => Carbon::now()->startOfMonth(),
                        'custom' => Carbon::now(),
                        default => $budget->start_date,
                    };

                    $newEndDate = match ($budget->period) {
                        'daily' => Carbon::parse($budget->start_date)->endOfDay(),
                        'weekly' => Carbon::parse($budget->start_date)->endOfWeek(),
                        'monthly' => Carbon::parse($budget->start_date)->endOfMonth(),
                        'custom' => Carbon::parse($budget->start_date)->addDays($budget->custom_period),
                        default => null,
                    };

                    $budget->days_left = $newEndDate ? now()->startOfDay()->diffInDays($newEndDate, false) : null;
                }

                $budget->save();
            }
        }

        $this->info('Budgets updated successfully.');
    }
}