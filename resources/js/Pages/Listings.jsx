import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../../css/Listings.css";

function Listings({ auth }) {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedTypeFields, setSelectedTypeFields] = useState([]);
  const [listings, setListings] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editListing, setEditListing] = useState(null);
  const [newListing, setNewListing] = useState({});

  useEffect(() => {
    axios
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
      const response = await axios.get(`/api/vehicle-types/${selectedVehicleType}`);
      setSelectedTypeFields(response.data.fields || []);
      const initialValues = {};
      response.data.fields.forEach((field) => {
        initialValues[field.name] = '';
      });
      setNewListing(initialValues);
    } catch (error) {
      console.error("Error fetching vehicle type fields:", error);
    }
  };

  const fetchListings = () => {
    axios
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
      if (editListing) {
        await axios.put(
          `/api/vehicle-types/${selectedVehicleType}/listings/${editListing.id}`,
          { data: newListing }
        );
      } else {
        await axios.post(`/api/vehicle-types/${selectedVehicleType}/listings`, {
          data: newListing,
          user_id: auth.user.id,
        });
      }
      resetForm();
      fetchListings();
    } catch (error) {
      console.error("Error saving listing:", error);
    }
  };

  const handleEditListing = (listing) => {
    setEditListing(listing);
    setNewListing(listing.data);
    setShowCreateForm(true);
  };

  const handleDeleteListing = async (listingId) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`/api/vehicle-types/${selectedVehicleType}/listings/${listingId}`);
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setNewListing((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const resetForm = () => {
    setShowCreateForm(false);
    setEditListing(null);
    const emptyValues = {};
    selectedTypeFields.forEach((field) => {
      emptyValues[field.name] = '';
    });
    setNewListing(emptyValues);
  };

  const canManageListings = auth.user && (auth.user.role === 'admin' || auth.user.role === 'user');

  const renderFormField = (field) => {
    const fieldName = field.name;
    const isRequired = field.required;
    const capitalizedName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, ' ');

    return (
      <div key={fieldName} className="form-field">
        <label htmlFor={fieldName}>{capitalizedName}:</label>
        <input
          type={fieldName === 'year' ? 'number' : 'text'}
          id={fieldName}
          placeholder={capitalizedName}
          value={newListing[fieldName] || ''}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          required={isRequired}
          className="form-input"
        />
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="listings-container">
        <div className="vehicle-type-selector">
          <label htmlFor="vehicle-type">Select Vehicle Type:</label>
          <select
            id="vehicle-type"
            onChange={(e) => setSelectedVehicleType(e.target.value)}
            value={selectedVehicleType || ''}
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
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? "Cancel" : editListing ? "Edit Listing" : "Create New Listing"}
            </button>

            {showCreateForm && (
              <form onSubmit={handleCreateOrUpdateListing} className="create-listing-form">
                {selectedTypeFields.map((field) => renderFormField(field))}
                <button type="submit" className="btn-submit">
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
                <a href={`/listings/${selectedVehicleType}/${listing.id}`} className="listing-link">
                  <h3>
                    {listing.data.make || "Unknown Make"} {listing.data.model || "Unknown Model"}
                  </h3>
                  {Object.entries(listing.data).map(([key, value]) => {
                    const capitalizedKey =
                      key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
                    return (
                      <p key={key}>
                        <strong>{capitalizedKey}:</strong> {value}
                      </p>
                    );
                  })}
                </a>
                {canManageListings && 
                  (auth.user.role === 'admin' || auth.user.id === listing.user_id) && (
                  <div className="listing-actions">
                    <button className="btn-edit" onClick={() => handleEditListing(listing)}>
                      Edit
                    </button>
                    <button className="btn-danger" onClick={() => handleDeleteListing(listing.id)}>
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
  );
}

export default Listings;