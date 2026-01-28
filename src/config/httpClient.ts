"use client";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 120000, // 2 minutes timeout
});
axios.defaults.withCredentials = true;

// Request Interceptor: Attach token from sessionStorage
// api.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // const tenantId = getTenantId();
//     // if (tenantId) {
//     //   // The header name you requested
//     //   config.headers['x-tenant-id'] = tenantId;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

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

// Basic Response Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please try again.",
      });
    }

    return Promise.reject({
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
      status: error.response.status,
    });
  }
);


export default api;
