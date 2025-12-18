import type { RegisterFormData } from "@/modules/auth/Register/schemas/auth.schema";
import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RefreshAuthResponse } from "./auth.types";
import type { LoginDto } from "@/shared/types/validation";

export const login = createAsyncThunk(
  "auth/login",
  async ({
    identifier,
    password,
    rememberMe,
  }: LoginDto & { rememberMe?: boolean }) => {
    const response = await api.post("/auth/login", { identifier, password });

    // Cookie-based auth: tokens are in HTTP-only cookies, not in response
    // Backend sets cookies automatically
    localStorage.setItem(
      "accessTokenExpiresAt",
      response.data.data?.accessTokenExpiresAt.toString(),
    );

    // Handle remember me functionality (store email only)
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", identifier);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
    }

    return {
      user: response.data?.data?.user,
      accessTokenExpiresAt: response.data?.data?.accessTokenExpiresAt,
    };
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, username, password }: RegisterFormData) => {
    const response = await api.post("/auth/register", {
      email,
      username,
      password,
    });

    // Cookie-based auth: tokens are in HTTP-only cookies, not in response
    // Backend sets cookies automatically
    localStorage.setItem(
      "accessTokenExpiresAt",
      response.data.data?.accessTokenExpiresAt.toString(),
    );

    return {
      user: response.data.data?.user,
      accessTokenExpiresAt: response.data.data?.accessTokenExpiresAt,
    };
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  // Cookie-based auth: backend clears cookies
  // Only clear remember me preferences
  localStorage.removeItem("accessTokenExpiresAt");
  localStorage.removeItem("rememberMe");
  localStorage.removeItem("email");
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (): Promise<RefreshAuthResponse> => {
    try {
      console.log("🔐 checkAuth: Checking auth via cookie-based /auth/me");
      // Use cookie-based /auth/me endpoint (cookies sent automatically)
      const response = await api.get("/auth/me");

      console.log("🔐 checkAuth: API response success", {
        status: response.status,
        hasData: !!response.data,
        hasUserData: !!response.data?.data?.user,
      });

      // Cookie-based auth: no token in response, only user data
      return {
        user: response.data.data?.user,
        accessTokenExpiresAt: response.data.data?.accessTokenExpiresAt, // Not needed with cookie auth
      };
    } catch (error: any) {
      localStorage.removeItem("accessTokenExpiresAt");
      console.log("🔐 checkAuth: API call failed - no valid cookie", {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
      });
      throw error;
    }
  },
);
