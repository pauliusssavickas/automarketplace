import React, { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";
import Header from "./Header";
import "../../css/Listings.css";
import Footer from "./Footer";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ListingDetails({ vehicleTypeId, listingId }) {
  const [listing, setListing] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [auth, setAuth] = useState({ user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth({ user });
  }, []);

  const fetchData = async () => {
    try {
      const [listingResponse, commentsResponse] = await Promise.all([
        apiClient.get(`/api/vehicle-types/${vehicleTypeId}/listings/${listingId}`),
        apiClient.get(`/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments`),
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
      await apiClient.post(
        `/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments`,
        { content: newComment }
      );
      setNewComment("");
      fetchData();
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await apiClient.put(
        `/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments/${commentId}`,
        { content: editedContent }
      );
      setEditingComment(null);
      setEditedContent("");
      fetchData();
    } catch (error) {
      console.error("Error updating comment:", error.response?.data || error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await apiClient.delete(
        `/api/vehicle-types/${vehicleTypeId}/listings/${listingId}/comments/${commentId}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting comment:", error.response?.data || error.message);
    }
  };

  const canManageComments =
    auth.user && (auth.user.role === "admin" || auth.user.role === "user");

  if (loading)
    return (
      <div>
        <Header />
        <div className="listings-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div>
        <Header />
        <div className="listings-container">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  if (!listing)
    return (
      <div>
        <Header />
        <div className="listings-container">
          <p>Listing not found.</p>
        </div>
      </div>
    );

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap">
        <div className="listings-container">
          <div className="listing-details">
            <div className="details-top">
              {/* Photo Carousel */}
              {listing.photos && listing.photos.length > 0 && (
                <div className="photo-carousel">
                  <Carousel showThumbs={true} infiniteLoop={true}>
                    {listing.photos.map((photo, index) => (
                      <div key={index}>
                        <img
                          src={`/storage/${photo.photo_path}`}
                          alt={`Photo ${index + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}

              {/* Vehicle Details */}
              <div className="vehicle-details">
                <h3 className="highlighted-title">
                  {listing.data.make || "Unknown Make"} {listing.data.model || "Unknown Model"}
                </h3>

                <p><strong>Price:</strong> ${listing.price}</p>

                {/* Contact number as a button without "Contact:" prefix */}
                {listing.contact_number && (
                  <p>
                    <a href={`tel:${listing.contact_number}`} className="contact-button">
                      Call {listing.contact_number}
                    </a>
                  </p>
                )}

                {Object.entries(listing.data).map(([key, value]) => {
                  if (key === "make" || key === "model") return null;
                  const capitalizedKey =
                    key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
                  return (
                    <p key={key}>
                      <strong>{capitalizedKey}:</strong> {value}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="listing-description">
              <h4>Description</h4>
              <p>{listing.description}</p>
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
                        (auth.user.role === "admin" || auth.user.id === comment.user_id) && (
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
      <Footer />
    </div>
  );
}

export default ListingDetails;
