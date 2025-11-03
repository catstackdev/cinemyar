import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { Response } from "@/types/response.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

let showToastFn: ((message: string, type: "error" | "success") => void) | null =
  null;

export const setupAxiosInterceptors = (
  showToast: (message: string, type: "error" | "success") => void,
) => {
  showToastFn = showToast;
};

// Response interceptor with refresh token logic (commented out)
// apiClient.interceptors.response.use(
//   (response: AxiosResponse<Response<any>>) => response,
//   async (error: AxiosError<Response<any>>) => {
//     const originalRequest = error.config as any;
//
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//
//       try {
//         await apiClient.post("/auth/refresh");
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         window.location.href = "/auth";
//         return Promise.reject(refreshError);
//       }
//     }
//
//     const errorMessage =
//       error.response?.data?.message || 
//       error.message || 
//       "Something went wrong";
//
//     if (showToastFn) {
//       showToastFn(errorMessage, "error");
//     }
//
//     return Promise.reject(error);
//   },
// );
// Request interceptor to add Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle errors globally with standardized response types
apiClient.interceptors.response.use(
  (response: AxiosResponse<Response<any>>) => response,
  (error: AxiosError<Response<any>>) => {
    const errorMessage =
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      "Something went wrong";

    if (showToastFn) {
      showToastFn(errorMessage, "error");
    }

    return Promise.reject(error);
  },
);

// Typed API client wrapper that ensures Response<T> structure
export const api = {
  get: <T = any>(url: string, config?: any): Promise<AxiosResponse<Response<T>>> =>
    apiClient.get(url, config),
  
  post: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<Response<T>>> =>
    apiClient.post(url, data, config),
  
  put: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<Response<T>>> =>
    apiClient.put(url, data, config),
  
  patch: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<Response<T>>> =>
    apiClient.patch(url, data, config),
  
  delete: <T = any>(url: string, config?: any): Promise<AxiosResponse<Response<T>>> =>
    apiClient.delete(url, config),
};
