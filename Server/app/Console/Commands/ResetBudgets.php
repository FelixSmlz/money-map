<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Budget;
use Carbon\Carbon;

class ResetBudgets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'budgets:reset';

    /**
     * The console command description.b
     *
     * @var string
     */
    protected $description = 'Resets budget amounts when the period ends';

    /**
     * Execute the console command.
     */
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

            if ($endDate !== null && Carbon::now()->greaterThanOrEqualTo($endDate)) {
                $budget->current_amount = 0;

                // Update the start_date to the new period's start date
                $budget->start_date = match ($budget->period) {
                    'daily' => Carbon::now()->startOfDay(),
                    'weekly' => Carbon::now()->startOfWeek(),
                    'monthly' => Carbon::now()->startOfMonth(),
                    'custom' => Carbon::now(),
                    default => $budget->start_date,
                };

                $budget->save();
            }
        }

        $this->info('Budget amounts have been reset.');
    }
}
