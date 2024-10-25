<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Listing;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Get all comments for a specific listing
    public function index($vehicle_type_id, $listing_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        // Get all comments for the specific listing
        $comments = $listing->comments()->get();

        return response()->json($comments, 200);
    }

    // Create a new comment for a specific listing
    public function store(Request $request, $vehicle_type_id, $listing_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        // Validate the request
        $validated = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        // Create the new comment
        $comment = $listing->comments()->create([
            'content' => $validated['content'],
            'user_id' => $validated['user_id'],
        ]);

        return response()->json($comment, 201);
    }

    // Show a specific comment
    public function show($vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        $comment = $listing->comments()->findOrFail($comment_id);

        return response()->json($comment, 200);
    }

    // Update a comment
    public function update(Request $request, $vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        $comment = $listing->comments()->findOrFail($comment_id);

        // Validate the request
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        // Update the comment
        $comment->update([
            'content' => $validated['content'],
        ]);

        return response()->json($comment, 200);
    }

    // Delete a comment
    public function destroy($vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        $comment = $listing->comments()->findOrFail($comment_id);

        $comment->delete();

        return response()->json(null, 204);
    }
}

