import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { ResponseType } from "@/types/response.types";
import type { AppDispatch } from "@/store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Axios client configured for cookie-based authentication
 * - withCredentials: true - Sends cookies with every request
 * - Tokens managed via HTTP-only cookies (no localStorage)
 */
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CRITICAL: Required for cookie-based auth
});

let showToastFn: ((message: string, type: "error" | "success") => void) | null =
  null;
let dispatchFn: AppDispatch | null = null;

export const setupAxiosInterceptors = (
  showToast: (message: string, type: "error" | "success") => void,
  dispatch: AppDispatch,
) => {
  showToastFn = showToast;
  dispatchFn = dispatch;
};

/**
 * Response interceptor with automatic token refresh
 * When 401 error occurs, tries to refresh using cookie
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse<ResponseType<any>>) => response,
  async (error: AxiosError<ResponseType<any>>) => {
    const originalRequest = error.config as any;
    const requestUrl = originalRequest?.url || "";

    // Skip auto-refresh for auth endpoints (login/register should fail immediately)
    const isAuthEndpoint = requestUrl.includes("/auth/login") || 
                          requestUrl.includes("/auth/register") ||
                          requestUrl.includes("/auth/refresh");

    // Handle 401 errors with automatic cookie refresh
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Axios Interceptor: 401 detected, attempting token refresh");
        
        // Call refresh endpoint (uses refresh_token cookie automatically)
        const refreshResponse = await axios.create({ 
          baseURL: API_URL,
          withCredentials: true // Important for refresh request too
        }).post("/auth/refresh");

        // Update localStorage with new accessTokenExpiresAt
        if (refreshResponse.data?.data?.accessTokenExpiresAt) {
          localStorage.setItem(
            "accessTokenExpiresAt",
            refreshResponse.data.data.accessTokenExpiresAt.toString()
          );
          console.log("✅ Axios Interceptor: Token refreshed, updated localStorage");
        }

        // Update Redux store with refreshed user data
        if (dispatchFn && refreshResponse.data?.data) {
          const { updateAuthFromRefresh } = await import("@/state/auth/auth.slice");
          dispatchFn(updateAuthFromRefresh({
            user: refreshResponse.data.data.user,
            accessTokenExpiresAt: refreshResponse.data.data.accessTokenExpiresAt,
          }));
          console.log("✅ Axios Interceptor: Redux state updated with refreshed user data");
        }

        // Retry original request (new access_token cookie is now set)
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Axios Interceptor: Token refresh failed", refreshError);
        
        // Refresh failed - clear localStorage and redirect to login
        localStorage.removeItem("accessTokenExpiresAt");
        
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

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

/**
 * Typed API client wrapper that ensures ResponseType<T> structure
 */
export const api = {
  get: <T = any>(url: string, config?: any): Promise<AxiosResponse<ResponseType<T>>> =>
    apiClient.get(url, config),
  
  post: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<ResponseType<T>>> =>
    apiClient.post(url, data, config),
  
  put: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<ResponseType<T>>> =>
    apiClient.put(url, data, config),
  
  patch: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<ResponseType<T>>> =>
    apiClient.patch(url, data, config),
  
  delete: <T = any>(url: string, config?: any): Promise<AxiosResponse<ResponseType<T>>> =>
    apiClient.delete(url, config),
};
