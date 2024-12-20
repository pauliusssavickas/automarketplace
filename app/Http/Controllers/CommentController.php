<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Listing;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($vehicle_type_id, $listing_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
            ->findOrFail($listing_id);

            $comments = $listing->comments()
            ->with(['user' => function($query) {
                $query->select('id', 'name');
            }])
            ->get();

        return response()->json($comments, 200);
    }

    public function store(Request $request, $vehicle_type_id, $listing_id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
            ->findOrFail($listing_id);

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment = $listing->comments()->create([
            'content' => $validated['content'],
            'user_id' => $user->id,
        ]);

        return response()->json($comment, 201);
    }


    public function show($vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
            ->findOrFail($listing_id);

        $comment = $listing->comments()->findOrFail($comment_id);

        return response()->json($comment, 200);
    }

    public function update(Request $request, $vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)->findOrFail($listing_id);
        $comment = $listing->comments()->findOrFail($comment_id);

        $user = $request->user();

        if ($comment->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update(['content' => $validated['content']]);

        return response()->json($comment, 200);
    }





    public function destroy(Request $request, $vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
            ->findOrFail($listing_id);

        $comment = $listing->comments()->findOrFail($comment_id);

        $user = $request->user(); // Use the authenticated user

        if ($comment->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(null, 204);
    }
}
