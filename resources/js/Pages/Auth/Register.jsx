import React, { useState } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const response = await axios.post("/api/auth/register", data);
      const { token, refresh_token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      } else {
        console.error("No token returned from backend.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ error: "Registration failed. Please try again." });
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label htmlFor="name" value="Name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={data.name}
            className="auth-input"
            autoComplete="name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" value="Email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="auth-input"
            autoComplete="username"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" value="Password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="auth-input"
            autoComplete="new-password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="password_confirmation" value="Confirm Password">
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="auth-input"
            autoComplete="new-password"
            onChange={(e) =>
              setData({ ...data, password_confirmation: e.target.value })
            }
            required
          />
          {errors.password_confirmation && (
            <p className="form-error">{errors.password_confirmation}</p>
          )}
        </div>

        <div>
          <button type="submit" className="auth-button" disabled={processing}>
            Register
          </button>
        </div>

        <div className="text-center">
          <Link href="/login" className="auth-link">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
