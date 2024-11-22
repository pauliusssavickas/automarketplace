import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import "../../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [newVehicleType, setNewVehicleType] = useState({
    name: "",
    fields: [{ name: "", required: false }],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const fetchVehicleTypes = async () => {
    try {
      const response = await axios.get("/api/vehicle-types");
      setVehicleTypes(response.data);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    }
  };

  const handleAddField = () => {
    setNewVehicleType((prev) => ({
      ...prev,
      fields: [...prev.fields, { name: "", required: false }],
    }));
  };

  const handleRemoveField = (index) => {
    setNewVehicleType((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const handleFieldChange = (index, key, value) => {
    setNewVehicleType((prev) => {
      const updatedFields = [...prev.fields];
      updatedFields[index][key] = value;
      return { ...prev, fields: updatedFields };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/vehicle-types", newVehicleType);
      setSuccessMessage("Vehicle type created successfully!");
      setErrorMessage("");
      setNewVehicleType({ name: "", fields: [{ name: "", required: false }] });
      fetchVehicleTypes();
    } catch (error) {
      console.error("Error creating vehicle type:", error);
      setErrorMessage("Failed to create vehicle type. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Header />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <section>
          <h2>Existing Vehicle Types</h2>
          <ul className="vehicle-type-list">
            {vehicleTypes.map((type) => (
              <li key={type.id}>
                <strong>{type.name}</strong> - Fields:{" "}
                {type.fields.map((field) => field.name).join(", ")}
              </li>
            ))}
          </ul>
        </section>

        <section className="create-vehicle-type">
          <h2>Create New Vehicle Type</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="vehicle-type-name">Name:</label>
              <input
                id="vehicle-type-name"
                type="text"
                value={newVehicleType.name}
                onChange={(e) =>
                  setNewVehicleType({ ...newVehicleType, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-fields">
              <h3>Fields</h3>
              {newVehicleType.fields.map((field, index) => (
                <div key={index} className="field-row">
                  <input
                    type="text"
                    placeholder="Field Name"
                    value={field.name}
                    onChange={(e) =>
                      handleFieldChange(index, "name", e.target.value)
                    }
                    required
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        handleFieldChange(index, "required", e.target.checked)
                      }
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

            <button type="submit" className="btn-submit">
              Create Vehicle Type
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;