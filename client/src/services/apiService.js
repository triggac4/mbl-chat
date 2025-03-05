import axios from "axios";
import { getAuthHeader } from "./authService";
import useAuthStore from "../store/authStore";
import { backendBaseUrl } from "../env";

const API_URL = `${backendBaseUrl}/api`;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add auth header interceptor
api.interceptors.request.use(
  (config) => {
    const headers = getAuthHeader();
    if (headers.Authorization) {
      config.headers.Authorization = headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token expiration
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem("user");
//       useAuthStore.getState().logout();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
