import axios, { type AxiosError, type AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let showToastFn: ((message: string, type: "error" | "success") => void) | null =
  null;

export const setupAxiosInterceptors = (
  showToast: (message: string, type: "error" | "success") => void,
) => {
  showToastFn = showToast;
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await apiClient.post("/auth/refresh");
        return apiClient(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";

    if (showToastFn) {
      showToastFn(errorMessage, "error");
    }

    return Promise.reject(error);
  },
);
