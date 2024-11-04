<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Budget;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;


class BudgetController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $budgets = Budget::where('user_id', Auth::id())->get();;
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
        $request->validate([
            'name' => 'required|string|max:250',
            'limit' => 'required|numeric|min:0|max:999999',
            'period' => 'required|string|in:daily,weekly,monthly,custom',
            'start_date' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'category_id' => 'required|exists:categories,id',
            'custom_period' => 'integer|min:1|max:365|nullable'
        ]);

        $user = Auth::user();

        $budget = new Budget();
        $budget->user_id = $user->id;
        $budget->name = $request->name;
        $budget->limit = $request->limit;
        $budget->period = $request->period;
        $budget->start_date = $request->start_date;
        $budget->category_id = $request->category_id;
        $budget->custom_period = $request->custom_period;
        $budget->save();
        return response()->json($budget);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $budget = Budget::find($id);
        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('show', $budget);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }
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
