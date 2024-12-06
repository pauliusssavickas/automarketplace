import axios from "axios";

const apiClient = axios.create({
  baseURL: '/',
  withCredentials: true, // Ensure cookies are included
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include the token from localStorage if present
apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor for handling 401 errors and refreshing tokens
apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post("/api/auth/refresh", {
            refresh_token: refreshToken,
          }, {
            withCredentials: true
          });
          const { token, refresh_token } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("refresh_token", refresh_token);
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
