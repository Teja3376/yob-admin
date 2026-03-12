"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  // baseURL: "https://nexa-admin-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 120000,
});

axios.defaults.withCredentials = true;

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please try again.",
      });
    }

    const status = error.response.status;

    // 🔐 Unauthorized → login
    if (status === 401) {
      sessionStorage.clear();
      window.location.href = "/login";
    }

    // 🚫 Permission denied
    if (status === 403) {
      if (window.location.pathname !== "/no-permission") {
        window.location.href = "/no-permission";
      }
    }

    return Promise.reject({
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
      status,
    });
  }
);

export default api;