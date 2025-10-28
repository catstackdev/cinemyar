import type { LoginFormData } from "@/features/auth/Login/schemas/auth.schema";
import { apiClient } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RefreshAuthResponse } from "./auth.types";

export const login = createAsyncThunk(
  "auth/login",
  async ({
    email,
    password,
    rememberMe,
  }: LoginFormData & { rememberMe?: boolean }) => {
    const response = await apiClient.post("/auth/login", { email, password });
    console.log("response", response);
    //temp store local storage
    localStorage.setItem("accessToken", response.data.access_token);
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
    }

    return {
      user: response.data.user,
      access_token: response.data.access_token,
    };
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await apiClient.post("/auth/logout");
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (): Promise<RefreshAuthResponse> => {
    const response = await apiClient.get("/auth/refresh");
    return response.data;
  },
);
