<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\BankAccount;
use App\Services\PlaidService;

class PlaidController extends Controller
{
    protected $plaidService;

    public function __construct(PlaidService $plaidService)
    {
        $this->plaidService = $plaidService;
    }

    /**
     * Exchange public_token for access_token
     */
    public function exchangePublicToken(Request $request): JsonResponse
    {
        $request->validate([
            'public_token' => 'required|string',
        ]);

        $publicToken = $request->input('public_token');

        try {
            $response = $this->plaidService->exchangePublicToken($publicToken);

            $accessToken = $response['access_token'];
            $itemId = $response['item_id'];
            $institutionId = $response['item']['institution_id'];
            $institutionName = $response['item']['institution']['name'];

            // Save to database
            $bankAccount = BankAccount::create([
                'user_id' => Auth::id(),
                'plaid_access_token' => encrypt($accessToken),
                'plaid_item_id' => $itemId,
                'institution_id' => $institutionId,
                'institution_name' => $institutionName,
            ]);

            return response()->json([
                'message' => 'Bank account linked successfully',
                'bank_account' => $bankAccount,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to link bank account',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
