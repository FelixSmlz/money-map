<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = User::where('email', $request->email)->first();
        $user->tokens()->delete();

        $token = $user->createToken('access_token', ['create-expense, update-expense, delete-expense'])->plainTextToken;

        return response()->json([
            'message' => "Login successful",
            'access_token' => $token
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout successful'
        ], Response::HTTP_OK);
    }

    public function loginSPA(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Login successful'
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => 'Invalid login credentials'
        ], Response::HTTP_UNAUTHORIZED);
    }

    public static function isAdmin(User $user): bool
    {
        return strtolower($user->name) === strtolower('admin');
    }
}
