<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Budget;
use App\Models\User;


class BudgetController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $budgets = Budget::all();
        return response()->json($budgets);
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
        $budget = new Budget();
        $budget->user_id = $request->user_id;
        $budget->name = $request->name;
        $budget->amount = $request->amount;
        $budget->date = now();
        $budget->save();
        return response()->json($budget);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $budget = Budget::find($id);
        return response()->json($budget);
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
        $budget = Budget::find($id);
        $budget->name = $request->name;
        $budget->save();
        return response()->json($budget, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $budget = Budget::find($id);
        $budget->delete();
        return response()->json($budget);
    }

    public function getByUserId(string $id)
    {
        $budgets = User::find($id)->budgets;
        return response()->json($budgets);
    }
}
