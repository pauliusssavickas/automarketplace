import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import "../../css/AdminDashboard.css";
import apiClient from "../utils/axiosConfig";
import Footer from './Footer';

const AdminDashboard = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [newVehicleType, setNewVehicleType] = useState({
    name: "",
    fields: [{ name: "", required: false }],
  });
  const [editingType, setEditingType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const fetchVehicleTypes = async () => {
    try {
      const response = await apiClient.get("/api/vehicle-types");
      setVehicleTypes(response.data);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
      setErrorMessage("Failed to fetch vehicle types");
    }
  };

  const handleAddField = () => {
    if (editingType) {
      setEditingType(prev => ({
        ...prev,
        fields: [...prev.fields, { name: "", required: false }],
      }));
    } else {
      setNewVehicleType(prev => ({
        ...prev,
        fields: [...prev.fields, { name: "", required: false }],
      }));
    }
  };

  const handleRemoveField = (index) => {
    if (editingType) {
      setEditingType(prev => ({
        ...prev,
        fields: prev.fields.filter((_, i) => i !== index),
      }));
    } else {
      setNewVehicleType(prev => ({
        ...prev,
        fields: prev.fields.filter((_, i) => i !== index),
      }));
    }
  };

  const handleFieldChange = (index, key, value) => {
    const updateFields = (prev) => {
      const updatedFields = [...prev.fields];
      updatedFields[index][key] = value;
      return { ...prev, fields: updatedFields };
    };

    if (editingType) {
      setEditingType(updateFields);
    } else {
      setNewVehicleType(updateFields);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingType) {
        await apiClient.put(`/api/vehicle-types/${editingType.id}`, editingType);
        setSuccessMessage("Vehicle type updated successfully!");
        setEditingType(null);
      } else {
        await apiClient.post("/api/vehicle-types", newVehicleType);
        setSuccessMessage("Vehicle type created successfully!");
        setNewVehicleType({ name: "", fields: [{ name: "", required: false }] });
      }
      setErrorMessage("");
      fetchVehicleTypes();
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || "Operation failed. Please try again.";
      setErrorMessage(message);
      setSuccessMessage("");
    }
  };

  const handleEdit = (type) => {
    setEditingType(type);
    setNewVehicleType({ name: "", fields: [{ name: "", required: false }] });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleDelete = async (type) => {
    if (!window.confirm(`Are you sure you want to delete ${type.name}?`)) {
      return;
    }

    try {
      await apiClient.delete(`/api/vehicle-types/${type.id}`);
      setSuccessMessage("Vehicle type deleted successfully!");
      setErrorMessage("");
      fetchVehicleTypes();
    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || "Failed to delete vehicle type";
      setErrorMessage(message);
      setSuccessMessage("");
    }
  };

  const handleCancel = () => {
    setEditingType(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrap">
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          
          <section>
            <h2>Existing Vehicle Types</h2>
            <ul className="vehicle-type-list">
              {vehicleTypes.map((type) => (
                <li key={type.id} className="vehicle-type-item">
                  <div className="vehicle-type-info">
                    <strong>{type.name}</strong>
                    <div className="fields-list">
                      Fields: {type.fields.map((field) => 
                        `${field.name}${field.required ? ' (required)' : ''}`
                      ).join(", ")}
                    </div>
                    <div className="listings-count">
                      Listings: {type.listings_count}
                    </div>
                  </div>
                  <div className="vehicle-type-actions">
                    <button 
                      onClick={() => handleEdit(type)}
                      className="btn-edit"
                      disabled={editingType !== null}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(type)}
                      className="btn-delete"
                      disabled={type.listings_count > 0}
                      title={type.listings_count > 0 ? "Cannot delete while listings exist" : ""}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="create-vehicle-type">
            <h2>{editingType ? 'Edit Vehicle Type' : 'Create New Vehicle Type'}</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="vehicle-type-name">Name:</label>
                <input
                  id="vehicle-type-name"
                  type="text"
                  value={editingType ? editingType.name : newVehicleType.name}
                  onChange={(e) => {
                    if (editingType) {
                      setEditingType({ ...editingType, name: e.target.value });
                    } else {
                      setNewVehicleType({ ...newVehicleType, name: e.target.value });
                    }
                  }}
                  required
                />
              </div>

              <div className="form-fields">
                <h3>Fields</h3>
                {(editingType ? editingType.fields : newVehicleType.fields).map((field, index) => (
                  <div key={index} className="field-row">
                    <input
                      type="text"
                      placeholder="Field Name"
                      value={field.name}
                      onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                      required
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                      />
                      Required
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddField}
                  className="btn-primary"
                >
                  Add Field
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {editingType ? 'Update Vehicle Type' : 'Create Vehicle Type'}
                </button>
                {editingType && (
                  <button type="button" onClick={handleCancel} className="btn-cancel">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;