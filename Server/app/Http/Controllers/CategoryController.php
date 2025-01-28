<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\JsonResponse;
use App\Models\Goal;
use App\Traits\HasPagination;

class CategoryController extends Controller
{

    use HasPagination;

    // Get all categories

    public function index(): JsonResponse
    {
        $params = $this->getPaginationParams();

        $goals = Goal::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate($params['per_page']);

        return response()->json($this->paginationResponse($goals));
    }

    // Create category

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:250',
            'color_code' => 'required|string|regex:/^#([A-Fa-f0-9]{6})$/',
        ]);

        $user = Auth::user();
        $category = new Category();
        $category->user_id = $user->id;
        $category->name = $request->name;
        $category->color_code = $request->color_code;
        $category->icon_name = $request->icon_name;
        $category->save();

        return response()->json(['message' => 'Category created successfully', 'category:' => $category], Response::HTTP_CREATED);
    }

    // Get category by id

    public function show(string $id): JsonResponse
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('show', $category);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        return response()->json(['category' => $category], Response::HTTP_OK);
    }

    // Update category

    public function update(Request $request, string $id): JsonResponse
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('update', $category);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $request->validate([
            'name' => 'string|max:250',
            'color_code' => 'string|regex:/^#([A-Fa-f0-9]{6})$/',
        ]);

        $category->name = $request->name;
        $category->color_code = $request->color_code;
        $category->icon_name = $request->icon_name;
        $category->save();

        return response()->json(['message' => 'Category updated successfully', 'category:' => $category], Response::HTTP_OK);
    }

    // Delete category

    public function destroy(string $id): JsonResponse
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $authResponse = Gate::inspect('delete', $category);
        if ($authResponse->denied()) {
            return response()->json(['message' => $authResponse->message()], Response::HTTP_FORBIDDEN);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], Response::HTTP_OK);
    }
}
