import React, { useState } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const response = await axios.post("/api/auth/login", data);
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
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ error: "Login failed. Please try again." });
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      <form onSubmit={submit} className="space-y-6">
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
            autoComplete="current-password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        <div>
          <button type="submit" className="auth-button" disabled={processing}>
            Log in
          </button>
        </div>

        <div className="text-center">
          <Link href="/register" className="auth-link">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
