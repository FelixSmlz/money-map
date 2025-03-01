<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(): JsonResponse
    {
        $notifications = Auth::user()->notifications;
        return response()->json(['notifications' => $notifications]);
    }

    public function unread(): JsonResponse
    {
        $notifications = Auth::user()->unreadNotifications;
        return response()->json(['notifications' => $notifications]);
    }

    public function markAsRead($id): JsonResponse
    {
        $notification = Auth::user()->notifications->find($id);
        if ($notification) {
            $notification->markAsRead();
            return response()->json(['message' => 'Notification marked as read']);
        }
        return response()->json(['message' => 'Notification not found'], 404);
    }
}
