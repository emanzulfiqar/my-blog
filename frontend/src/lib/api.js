import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-storage");
  if (token) {
    try {
      const parsedToken = JSON.parse(token);
      if (parsedToken.state?.token) {
        config.headers.Authorization = `Bearer ${parsedToken.state.token}`;
      }
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
