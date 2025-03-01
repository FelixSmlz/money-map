<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Budget;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use App\Traits\HasPagination;


class BudgetController extends Controller
{
    use HasPagination;

    // Get all budgets

    public function index(): JsonResponse
    {
        $params = $this->getPaginationParams();

        $budgets = Budget::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate($params['per_page']);

        return response()->json($this->paginationResponse($budgets));
    }

    // Create budget

    public function store(Request $request): JsonResponse
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
        $budget->days_left =
            match ($request->period) {
                'daily' => 1,
                'weekly' => 7,
                'monthly' => Carbon::parse($request->start_date)->daysInMonth,
                'custom' => $request->custom_period,
            };
        $budget->category_id = $request->category_id;
        $budget->custom_period = $request->custom_period;
        $budget->save();

        return response()->json(['message' => 'Budget created successfully', 'budget:' => $budget], Response::HTTP_CREATED);
    }

    // Get budget by id

    public function show(string $id): JsonResponse
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('show', $budget);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['budget' => $budget], Response::HTTP_OK);
    }

    // Update budget

    public function update(Request $request, string $id): JsonResponse
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('update', $budget);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $validatedData = $request->validate([
            'name' => 'string|max:250',
            'limit' => 'numeric|min:0|max:999999',
            'period' => 'string|in:daily,weekly,monthly,custom',
            'start_date' => 'date|date_format:Y-m-d|after_or_equal:today',
            'category_id' => 'exists:categories,id',
            'custom_period' => 'integer|min:1|max:365|nullable'
        ]);


        $budget->fill($validatedData);
        $budget->save();
        $budget->checkAndNotify();

        return response()->json(['message' => 'Budget updated successfully', 'budget:' => $budget], Response::HTTP_OK);
    }

    // Delete budget

    public function destroy(string $id): JsonResponse
    {
        $budget = Budget::find($id);

        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('delete', $budget);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $budget->delete();

        return response()->json(['message' => 'Budget deleted successfully'], Response::HTTP_OK);
    }
}
