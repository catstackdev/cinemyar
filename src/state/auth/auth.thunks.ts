import type { LoginFormData } from "@/features/auth/Login/schemas/auth.schema";
import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RefreshAuthResponse } from "./auth.types";

export const login = createAsyncThunk(
  "auth/login",
  async ({
    email,
    password,
    rememberMe,
  }: LoginFormData & { rememberMe?: boolean }) => {
    const response = await api.post("/auth/login", { email, password });
    
    // Store access token in localStorage
    if (response.data.data?.access_token) {
      localStorage.setItem("accessToken", response.data.data.access_token);
    }
    
    // Handle remember me functionality
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
    }

    return {
      user: response.data.data.user,
      access_token: response.data.data.access_token,
    };
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  // Clear localStorage on logout
  localStorage.removeItem("accessToken");
  localStorage.removeItem("rememberMe");
  localStorage.removeItem("email");
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (): Promise<RefreshAuthResponse> => {
    // Check if we have a token in localStorage first
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("🔐 checkAuth: No token found in localStorage");
      throw new Error("No access token found");
    }

    try {
      console.log("🔐 checkAuth: Making API call to /auth/validate with token:", token.substring(0, 20) + "...");
      const response = await api.get("/auth/validate");
      
      console.log("🔐 checkAuth: API response success", {
        status: response.status,
        hasData: !!response.data,
        hasUserData: !!response.data?.data?.user,
        hasToken: !!response.data?.data?.access_token
      });
      
      // Update token in localStorage if a new one is provided
      if (response.data.data?.access_token) {
        localStorage.setItem("accessToken", response.data.data.access_token);
      }
      
      return response.data.data;
    } catch (error: any) {
      console.log("🔐 checkAuth: API call failed", {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        responseData: error?.response?.data
      });
      // Clear invalid token
      localStorage.removeItem("accessToken");
      throw error;
    }
  },
);
