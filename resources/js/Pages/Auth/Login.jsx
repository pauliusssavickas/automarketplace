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
      const response = await axios.post("/api/login", data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      const { token, refresh_token, user } = response.data;

      if (token) {
        // Store auth data
        localStorage.setItem("token", token);
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }
        localStorage.setItem("user", JSON.stringify(user));

        // Clear any existing errors
        setErrors({});

        // Redirect to home page
        window.location.href = "/";
      } else {
        setErrors({ error: "Invalid response from server." });
        console.error("No token returned from backend.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      
      if (error.response?.status === 401) {
        setErrors({ error: "Invalid email or password." });
      } else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.error) {
        setErrors({ error: error.response.data.error });
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
        {errors.error && (
          <div className="text-red-500 text-sm text-center">
            {errors.error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="auth-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            autoComplete="username"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="auth-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            autoComplete="current-password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="auth-button w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={processing}
          >
            {processing ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        <div className="text-center text-sm">
          <Link href="/register" className="auth-link font-medium text-indigo-600 hover:text-indigo-500">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}