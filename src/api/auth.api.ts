import { apiClient } from "@/lib/axios";
import type { LoginDto, RegisterDto } from "@/shared/validation";

/**
 * Cookie-based Auth Response
 * Tokens are stored in HTTP-only cookies, not in response body
 */
export interface CookieAuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    createdAt: string;
  };
  accessTokenExpiresAt: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
}

/**
 * Auth API using cookie-based authentication (/auth/ endpoints)
 * Tokens are automatically managed via HTTP-only cookies
 */
export const authAPI = {
  /**
   * Login with email and password
   * Sets access_token and refresh_token cookies automatically
   */
  login: async (credentials: LoginDto): Promise<CookieAuthResponse> => {
    const { data } = await apiClient.post<CookieAuthResponse>(
      "/auth/login",
      credentials,
    );
    return data;
  },

  /**
   * Register new user
   * Sets access_token and refresh_token cookies automatically
   */
  register: async (credentials: RegisterDto): Promise<CookieAuthResponse> => {
    const { data } = await apiClient.post<CookieAuthResponse>(
      "/auth/register",
      credentials,
    );
    return data;
  },

  /**
   * Logout - clears auth cookies on backend
   */
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  /**
   * Refresh access token using refresh_token cookie
   * No body required - uses cookie automatically
   */
  refreshToken: async (): Promise<CookieAuthResponse> => {
    const { data } = await apiClient.post<CookieAuthResponse>("/auth/refresh");
    return data;
  },

  /**
   * Get current user info
   * Reads user from access_token cookie
   */
  me: async (): Promise<User> => {
    const { data } = await apiClient.get<CookieAuthResponse>("/auth/me");
    return data.user;
  },

  /**
   * Change password for authenticated user
   */
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/change-password", data);
    return response.data;
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  },

  /**
   * Reset password with token from email
   */
  resetPassword: async (
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};
