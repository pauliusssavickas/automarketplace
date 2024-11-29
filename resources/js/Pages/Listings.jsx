import React, { useState, useEffect } from "react";
import apiClient from "../utils/axiosConfig";
import Header from "./Header";
import "../../css/Listings.css";
import Footer from './Footer';


function Listings() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedTypeFields, setSelectedTypeFields] = useState([]);
  const [listings, setListings] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editListing, setEditListing] = useState(null);
  const [newListing, setNewListing] = useState({});
  const [auth, setAuth] = useState({ user: null });
  const [photosToUpload, setPhotosToUpload] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth({ user });
  }, []);

  useEffect(() => {
    apiClient
      .get("/api/vehicle-types")
      .then((response) => {
        setVehicleTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicle types:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedVehicleType) {
      fetchListings();
      fetchVehicleTypeFields();
    }
  }, [selectedVehicleType]);

  const fetchVehicleTypeFields = async () => {
    try {
      const response = await apiClient.get(`/api/vehicle-types/${selectedVehicleType}`);
      setSelectedTypeFields(response.data.fields || []);
      const initialValues = {};
      response.data.fields.forEach((field) => {
        initialValues[field.name] = "";
      });
      setNewListing({
        ...initialValues,
        price: "",
        contact_number: "",
        description: ""
      });
    } catch (error) {
      console.error("Error fetching vehicle type fields:", error);
    }
  };

  const fetchListings = () => {
    apiClient
      .get(`/api/vehicle-types/${selectedVehicleType}/listings`)
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  };

  const handleCreateOrUpdateListing = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Add all data fields to FormData
      Object.keys(newListing).forEach((key) => {
        if (key !== "price" && key !== "contact_number" && key !== "description") {
          formData.append(`data[${key}]`, newListing[key]);
        }
      });

      // Add price, contact number, and description
      formData.append("price", newListing.price || "");
      formData.append("contact_number", newListing.contact_number || "");
      formData.append("description", newListing.description || "");

      // Add photos
      photosToUpload.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });

      if (editListing) {
        await apiClient.post(
          `/api/vehicle-types/${selectedVehicleType}/listings/${editListing.id}?_method=PUT`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      } else {
        await apiClient.post(
          `/api/vehicle-types/${selectedVehicleType}/listings`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      }
      resetForm();
      fetchListings();
    } catch (error) {
      console.error("Error saving listing:", error);
    }
  };

  const handleEditListing = (listing) => {
    setEditListing(listing);
    setNewListing({
      ...listing.data,
      price: listing.price,
      contact_number: listing.contact_number,
      description: listing.description
    });
    setShowCreateForm(true);
  };

  const handlePhotoUpload = (e) => {
    setPhotosToUpload(Array.from(e.target.files));
  };

  const handleInputChange = (fieldName, value) => {
    setNewListing((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const resetForm = () => {
    setShowCreateForm(false);
    setEditListing(null);
    setPhotosToUpload([]);
    const emptyValues = {};
    selectedTypeFields.forEach((field) => {
      emptyValues[field.name] = "";
    });
    setNewListing({
      ...emptyValues,
      price: "",
      contact_number: "",
      description: ""
    });
  };

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await apiClient.delete(`/api/vehicle-types/${selectedVehicleType}/listings/${listingId}`);
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const canManageListings =
    auth.user && (auth.user.role === "admin" || auth.user.role === "user");

  const renderFormField = (field) => {
    const fieldName = field.name;
    const isRequired = field.required;
    const capitalizedName =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, " ");

    return (
      <div key={fieldName} className="form-field">
        <label htmlFor={fieldName}>{capitalizedName}:</label>
        <input
          type={fieldName === "year" ? "number" : "text"}
          id={fieldName}
          placeholder={capitalizedName}
          value={newListing[fieldName] || ""}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          required={isRequired}
          className="form-input"
        />
      </div>
    );
  };

  return (
    <div className="page-container"> {/* Wrapper for the entire page */}
    <Header />
    <div className="content-wrap"> {/* Wrapper for the main content */}
      <div className="listings-container">
        <div className="vehicle-type-selector">
          <label htmlFor="vehicle-type">Select Vehicle Type:</label>
          <select
            id="vehicle-type"
            onChange={(e) => setSelectedVehicleType(e.target.value)}
            value={selectedVehicleType || ""}
          >
            <option value="">-- Select Vehicle Type --</option>
            {vehicleTypes.map((vehicleType) => (
              <option key={vehicleType.id} value={vehicleType.id}>
                {vehicleType.name}
              </option>
            ))}
          </select>
        </div>

        {canManageListings && selectedVehicleType && (
          <div className="listing-actions">
            <button
              className="btn-primary"
              onClick={() => {
                resetForm();
                setShowCreateForm(!showCreateForm);
              }}
            >
              {showCreateForm ? "Cancel" : editListing ? "Edit Listing" : "Create New Listing"}
            </button>

            {showCreateForm && (
              <form onSubmit={handleCreateOrUpdateListing} className="create-listing-form">
                {selectedTypeFields.map((field) => renderFormField(field))}

                {/* Price Field */}
                <div className="form-field">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    placeholder="Price"
                    value={newListing.price || ""}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                {/* Contact Number Field */}
                <div className="form-field">
                  <label htmlFor="contact_number">Contact Number:</label>
                  <input
                    type="text"
                    id="contact_number"
                    placeholder="Contact Number"
                    value={newListing.contact_number || ""}
                    onChange={(e) => handleInputChange("contact_number", e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                {/* Description Field */}
                <div className="form-field">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    placeholder="Description"
                    value={newListing.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                    className="form-textarea"
                  />
                </div>

                {/* Photo Upload Field */}
                <div className="form-field">
                  <label htmlFor="photos">Upload Photos:</label>
                  <input
                    type="file"
                    id="photos"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn-create-edit">
                  {editListing ? "Update Listing" : "Create Listing"}
                </button>
              </form>
            )}
          </div>
        )}

        <section className="listings-grid">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <a
                  href={`/listings/${selectedVehicleType}/${listing.id}`}
                  className="listing-link"
                >
                  {/* Display Primary Photo or Placeholder */}
                  <div className="photo-container">
                    <img
                      src={
                        listing.photos && listing.photos.length > 0
                            ? `/storage/${listing.photos.find(photo => photo.is_primary)?.photo_path || listing.photos[0].photo_path}`
                            : `/images/placeholder.png`
                    }
                      alt="Vehicle"
                      className="listing-photo"
                    />
                  </div>
                  {/* Display Price */}
                  <p className="listing-price">
                    <strong>Price:</strong> ${listing.price}
                  </p>
                  {/* Display Data Fields */}
                  {Object.entries(listing.data).map(([key, value]) => {
                    const capitalizedKey =
                      key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
                    return (
                      <p key={key}>
                        <strong>{capitalizedKey}:</strong> {value}
                      </p>
                    );
                  })}
                </a>
                {canManageListings &&
                  (auth.user.role === "admin" || auth.user.id === listing.user_id) && (
                    <div className="listing-actions">
                      <button className="btn-edit" onClick={() => handleEditListing(listing)}>
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <p>No listings available for this vehicle type.</p>
          )}
        </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Listings;
