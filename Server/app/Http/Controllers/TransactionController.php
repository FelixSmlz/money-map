<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Goal;
use App\Models\Budget;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class TransactionController extends Controller
{

    // Get all transactions

    public function index(Request $request): JsonResponse
    {
        $query = Transaction::where('user_id', Auth::id());

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->query('search') . '%');
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->query('category_id'));
        }

        if ($request->has('type')) {
            $query->where('type', $request->query('type'));
        }

        if ($request->has('date_from')) {
            $query->where('date', '>=', $request->query('date_from'));
        }

        if ($request->has('date_to')) {
            $query->where('date', '<=', $request->query('date_to'));
        }

        $transactions = $query->get();

        return response()->json(['transactions' => $transactions], Response::HTTP_OK);
    }

    // Create transaction

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:250',
            'amount' => 'required|numeric|min:0|max:999999',
            'type' => 'required|string|in:expense,income',
            'date' => 'required|date|date_format:Y-m-d',
            'category_id' => 'exists:categories,id'
        ]);

        $user = Auth::user();

        $transaction = new Transaction();
        $transaction->name = $request->name;
        $transaction->amount = $request->amount;
        $transaction->type = $request->type;
        $transaction->date = $request->date;
        $transaction->category_id = $request->category_id;
        $transaction->user_id = $user->id;
        $transaction->save();

        $this->updateGoalsCurrentAmount($transaction);
        $this->updateBudgetsCurrentAmount($transaction);

        return response()->json(['message' => 'Transaction created successfully', 'transaction:' => $transaction], Response::HTTP_CREATED);
    }

    // Get transaction by id

    public function show(string $id): JsonResponse
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('show', $transaction);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }


        return response()->json(['transaction' => $transaction], Response::HTTP_OK);
    }

    // Update transaction

    public function update(Request $request, string $id): JsonResponse
    {

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('update', $transaction);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:250',
            'amount' => 'sometimes|numeric|min:0|max:999999',
            'type' => 'sometimes|string|in:expense,income',
            'date' => 'sometimes|date|date_format:Y-m-d',
            'category_id' => 'sometimes|exists:categories,id'
        ]);



        $transaction->fill($validatedData);
        $transaction->save();

        $this->updateGoalsCurrentAmount($transaction);
        $this->updateBudgetsCurrentAmount($transaction);

        return response()->json(['message' => 'Transaction updated successfully', 'transaction:' => $transaction], Response::HTTP_OK);
    }

    // Delete transaction

    public function destroy(string $id): JsonResponse
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('destroy', $transaction);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $transaction->delete();

        if ($transaction->type === 'expense') {
            $budget = Budget::where('category_id', $transaction->category_id)->where('user_id', $transaction->user_id)->first();
            if ($budget) {
            }
        } elseif ($transaction->type === 'income') {
            $goal = Goal::where('category_id', $transaction->category_id)->where('user_id', $transaction->user_id)->first();
            if ($goal) {
                $goal->updateSavedAmount();
            }
        } else {
            return response()->json(['message' => 'Transaction type not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['message' => 'Transaction deleted successfully'], Response::HTTP_OK);
    }

    private function updateGoalsCurrentAmount(Transaction $transaction): void
    {
        if ($transaction->type === 'income') {
            $goals = Goal::where('category_id', $transaction->category_id)
                ->where('user_id', $transaction->user_id)
                ->where('start_date', '<=', $transaction->date)
                ->where('end_date', '>=', $transaction->date)
                ->get();

            foreach ($goals as $goal) {
                $goal->current_amount += $transaction->amount;
                $goal->save();
                $goal->checkAndNotify();
            }
        }
    }

    private function updateBudgetsCurrentAmount(Transaction $transaction): void
    {

        if ($transaction->type === 'expense') {
            $budgets = Budget::where('category_id', $transaction->category_id)
                ->where('user_id', $transaction->user_id)
                ->where(function ($query) use ($transaction) {
                    $query->where(function ($q) use ($transaction) {
                        $q->where('start_date', '<=', $transaction->date)
                            ->whereRaw('DATE_ADD(start_date, INTERVAL days_left DAY) >= ?', [$transaction->date]);
                    });
                })
                ->get();

            foreach ($budgets as $budget) {
                $budget->current_amount += $transaction->amount;
                $budget->save();
                $budget->checkAndNotify();
            }
        }
    }

    public function getMonthlySpending(): JsonResponse
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $monthlySpent = Transaction::where('user_id', Auth::id())
            ->where('type', 'expense')
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        return response()->json([
            'monthly_spent' => $monthlySpent,
            'month' => $startOfMonth->format('F Y')
        ], Response::HTTP_OK);
    }
}