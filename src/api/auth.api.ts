import { apiClient } from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
    localStorage.clear();
  },

  refreshToken: async (
    refreshToken: string,
  ): Promise<{ accessToken: string }> => {
    const { data } = await apiClient.post("/auth/validate", { refreshToken });
    return data;
  },

  me: async (): Promise<LoginResponse["user"]> => {
    const { data } = await apiClient.get("/auth/me");
    return data;
  },
};
