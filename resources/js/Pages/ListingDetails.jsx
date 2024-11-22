// resources/js/Pages/ListingDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";
import "../../css/Listings.css";
import Header from "./Header";

function ListingDetails({ vehicleTypeId, listingId, auth }) {
  const [listing, setListing] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const fetchData = async () => {
    try {
      const [listingResponse, commentsResponse] = await Promise.all([
        axios.get(`/api/vehicle-types/${vehicleTypeId}/listings/${listingId}`),
        axios.get(
          `/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments`
        ),
      ]);
      setListing(listingResponse.data);
      setComments(commentsResponse.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vehicleTypeId && listingId) {
      fetchData();
    }
  }, [vehicleTypeId, listingId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments`,
        {
          content: newComment,
          user_id: auth.user.id,
        }
      );
      setNewComment("");
      fetchData();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(
        `/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments/${commentId}`,
        {
          content: editedContent,
        }
      );
      setEditingComment(null);
      setEditedContent("");
      fetchData();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(
        `/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments/${commentId}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const canManageComments = auth.user && 
    (auth.user.role === 'admin' || auth.user.role === 'user');

  if (loading) return <div><Header /><div className="listings-container"><p>Loading...</p></div></div>;
  if (error) return <div><Header /><div className="listings-container"><p>Error: {error}</p></div></div>;
  if (!listing) return <div><Header /><div className="listings-container"><p>Listing not found.</p></div></div>;

  return (
    <div>
      <Header />
      <div className="listings-container">
        <div className="listing-card">
          <div className="div-uc">
            <h3>
              {listing.data.make || "Unknown Make"}{" "}
              {listing.data.model || "Unknown Model"}
            </h3>
          </div>
          <div className="details-grid">
            {Object.entries(listing.data).map(([key, value]) => {
              if (typeof key === "string") {
                const capitalizedKey =
                  key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
                return (
                  <p key={key}>
                    <strong>{capitalizedKey}:</strong> {value}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          
          {canManageComments && (
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <button type="submit" className="btn-primary">
                Add Comment
              </button>
            </form>
          )}

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                {editingComment === comment.id ? (
                  <div className="edit-comment-form">
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button
                      onClick={() => handleUpdateComment(comment.id)}
                      className="btn-primary"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingComment(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <p>
                      <strong>User:</strong>{" "}
                      {comment.user ? comment.user.name : "Unknown"}
                    </p>
                    <p>{comment.content}</p>
                    <p>
                      <small>
                        {new Date(comment.created_at).toLocaleString()}
                      </small>
                    </p>
                    {canManageComments && 
                      (auth.user.role === 'admin' || 
                       auth.user.id === comment.user_id) && (
                      <div className="comment-actions">
                        <button
                          onClick={() => {
                            setEditingComment(comment.id);
                            setEditedContent(comment.content);
                          }}
                          className="btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No comments available for this listing.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;