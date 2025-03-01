<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Goal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\JsonResponse;
use App\Traits\HasPagination;

class GoalController extends Controller
{
    use HasPagination;

    // Get all goals

    public function index(): JsonResponse
    {
        $params = $this->getPaginationParams();

        $goals = Goal::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate($params['per_page']);

        return response()->json($this->paginationResponse($goals));
    }

    // Create goal

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:250',
            'target_amount' => 'required|numeric|min:0|max:999999',
            'start_date' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'category_id' => 'exists:categories,id'
        ]);

        $user = Auth::user();

        $goal = new Goal();
        $goal->user_id = $user->id;
        $goal->name = $request->name;
        $goal->target_amount = $request->target_amount;
        $goal->start_date = $request->start_date;
        $goal->category_id = $request->category_id;
        $goal->save();

        return response()->json(['message' => 'Goal created successfully', 'goal:' => $goal], Response::HTTP_CREATED);
    }

    // Get goal by id

    public function show(string $id): JsonResponse
    {
        $goal = Goal::find($id);

        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('show', $goal);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['goal' => $goal], Response::HTTP_OK);
    }

    // Update goal

    public function update(Request $request, string $id): JsonResponse
    {


        $goal = Goal::find($id);

        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('update', $goal);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $validatedData = $request->validate([
            'name' => 'string|max:250',
            'target_amount' => 'numeric|min:0|max:999999',
            'start_date' => 'date|date_format:Y-m-d|after_or_equal:today',
            'end_date' => 'date|date_format:Y-m-d|after:start_date',
            'category_id' => 'exists:categories,id'
        ]);

        $goal->fill($validatedData);
        $goal->save();
        $goal->checkAndNotify();

        return response()->json(['message' => 'Goal updated successfully', 'goal:' => $goal], Response::HTTP_OK);
    }

    // Delete goal

    public function destroy(string $id): JsonResponse
    {
        $goal = Goal::find($id);

        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('delete', $goal);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $goal->delete();

        return response()->json(['message' => 'Goal deleted successfully'], Response::HTTP_OK);
    }
}
