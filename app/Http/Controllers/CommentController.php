<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Listing;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Get all comments for a specific listing
    public function index($listingId)
    {
        $comments = Comment::where('listing_id', $listingId)->get();
        return response()->json($comments);
    }

    // Create a new comment for a listing
    public function store(Request $request, $listingId)
    {
        // Validate the input
        $validated = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        // Make sure the listing exists
        $listing = Listing::findOrFail($listingId);

        // Create the comment
        $comment = Comment::create([
            'content' => $validated['content'],
            'user_id' => $validated['user_id'],
            'listing_id' => $listing->id,
        ]);

        return response()->json($comment, 201);
    }

    // Show a specific comment
    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        return response()->json($comment);
    }

    // Update a specific comment
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        // Validate the input
        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        // Update the comment
        $comment->update([
            'content' => $validated['content'],
        ]);

        return response()->json($comment);
    }

    // Delete a specific comment
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(null, 204);
    }
}
