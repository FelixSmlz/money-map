<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $expenses = Expense::where('user_id', $user->id)->get();
        return response()->json($expenses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $expense = new Expense();
        $expense->user_id = $request->user_id;
        $expense->name = $request->name;
        $expense->amount = $request->amount;
        $expense->date = now(); // Add the current date
        $expense->save();
        return response()->json($expense);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $expense = Expense::find($id);
        $authResponse = Gate::inspect('delete', $expense);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }
        return response()->json($expense);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $expense = Expense::find($id);
        $authResponse = Gate::inspect('update', $expense);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }
        $expense->name = $request->name;
        $expense->amount = $request->amount;
        $expense->save();
        return response()->json($expense, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expense = Expense::find($id);
        $authResponse = Gate::inspect('delete', $expense);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }
        $expense->delete();
        return response()->json($expense);
    }
}