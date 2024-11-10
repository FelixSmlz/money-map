<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Models\Goal;
use App\Models\Budget;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TransactionController extends Controller
{
    public function index(Request $request)
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

        $transactions = $query->paginate(10);

        return response()->json(['transactions' => $transactions], Response::HTTP_OK);
    }

    public function store(Request $request)
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

        if ($transaction->type === 'expense') {
            $budget = Budget::where('category_id', $transaction->category_id)->where('user_id', $user->id)->first();
            if ($budget) {
                $budget->updateSpentAmount($budget);
            }
        } else {
            $goal = Goal::where('category_id', $transaction->category_id)->where('user_id', $user->id)->first();
            if ($goal) {
                $goal->updateSavedAmount();
            }
        }

        return response()->json(['message' => 'Transaction created successfully', 'transaction:' => $transaction], Response::HTTP_CREATED);
    }

    public function show(string $id)
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

    public function update(Request $request, string $id)
    {

        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('update', $transaction);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $request->validate([
            'name' => 'string|max:250',
            'amount' => 'numeric|min:0|max:999999',
            'type' => 'string|in:expense,income',
            'date' => 'date|date_format:Y-m-d',
            'category_id' => 'exists:categories,id'
        ]);

        $user = Auth::user();

        $transaction->name = $request->name ?? $transaction->name;
        $transaction->amount = $request->amount ?? $transaction->amount;
        $transaction->type = $request->type ?? $transaction->type;
        $transaction->date = $request->date ?? $transaction->date;
        $transaction->category_id = $request->category_id ?? $transaction->category_id;
        $transaction->user_id = $user->id;
        $transaction->save();

        if ($transaction->type === 'expense') {
            $budget = Budget::where('category_id', $transaction->category_id)->where('user_id', $user->id)->first();
            if ($budget) {
                $budget->updateSpentAmount();
            }
        } else {
            $goal = Goal::where('category_id', $transaction->category_id)->where('user_id', $user->id)->first();
            if ($goal) {
                $goal->updateSavedAmount();
            }
        }

        return response()->json(['message' => 'Transaction updated successfully', 'transaction:' => $transaction], Response::HTTP_OK);
    }

    public function destroy(string $id)
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
                $budget->updateSpentAmount();
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
}
