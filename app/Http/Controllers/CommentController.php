<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Listing;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Get all comments for a specific listing
/**
 * @OA\Get(
 *     path="/vehicle-types/{vehicleType}/listings/{listing}/comments",
 *     summary="Get all comments for a listing",
 *     tags={"Comments"},
 *     @OA\Parameter(
 *         name="vehicleType",
 *         in="path",
 *         required=true,
 *         description="The ID of the vehicle type",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="listing",
 *         in="path",
 *         required=true,
 *         description="The ID of the listing",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="A list of comments for the listing"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Listing not found"
 *     )
 * )
 */
    public function index($vehicle_type_id, $listing_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        // Get all comments for the specific listing with the related user data
        $comments = $listing->comments()->with('user')->get();

        return response()->json($comments, 200);
    }


    // Create a new comment for a specific listing
/**
 * @OA\Get(
 *     path="/vehicle-types/{vehicleType}/listings/{listing}/comments/{comment}",
 *     summary="Get a single comment by ID",
 *     tags={"Comments"},
 *     @OA\Parameter(
 *         name="vehicleType",
 *         in="path",
 *         required=true,
 *         description="The ID of the vehicle type",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="listing",
 *         in="path",
 *         required=true,
 *         description="The ID of the listing",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="comment",
 *         in="path",
 *         required=true,
 *         description="The ID of the comment",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Comment details"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Comment not found"
 *     )
 * )
 */


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
    /**
 * @OA\Get(
 *     path="/comments/{comment}",
 *     summary="Get a single comment by ID",
 *     tags={"Comments"},
 *     @OA\Parameter(
 *         name="comment",
 *         in="path",
 *         required=true,
 *         description="The ID of the comment",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Comment details"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Comment not found"
 *     )
 * )
 */

    public function show($vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        $comment = $listing->comments()->findOrFail($comment_id);

        return response()->json($comment, 200);
    }

    // Update a comment
/**
 * @OA\Put(
 *     path="/vehicle-types/{vehicleType}/listings/{listing}/comments/{comment}",
 *     summary="Update a comment",
 *     tags={"Comments"},
 *     @OA\Parameter(
 *         name="vehicleType",
 *         in="path",
 *         required=true,
 *         description="The ID of the vehicle type",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="listing",
 *         in="path",
 *         required=true,
 *         description="The ID of the listing",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="comment",
 *         in="path",
 *         required=true,
 *         description="The ID of the comment",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="text", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Comment updated successfully"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Comment not found"
 *     )
 * )
 */


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
/**
 * @OA\Delete(
 *     path="/vehicle-types/{vehicleType}/listings/{listing}/comments/{comment}",
 *     summary="Delete a comment",
 *     tags={"Comments"},
 *     @OA\Parameter(
 *         name="vehicleType",
 *         in="path",
 *         required=true,
 *         description="The ID of the vehicle type",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="listing",
 *         in="path",
 *         required=true,
 *         description="The ID of the listing",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="comment",
 *         in="path",
 *         required=true,
 *         description="The ID of the comment",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Comment deleted successfully"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Comment not found"
 *     )
 * )
 */


    public function destroy($vehicle_type_id, $listing_id, $comment_id)
    {
        $listing = Listing::where('vehicle_type_id', $vehicle_type_id)
                    ->findOrFail($listing_id);

        $comment = $listing->comments()->findOrFail($comment_id);

        $comment->delete();

        return response()->json(null, 204);
    }
}

