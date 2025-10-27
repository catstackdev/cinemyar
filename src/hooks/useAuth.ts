import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/auth.api";
import type { LoginFormData } from "@/features/auth/Login/schemas/auth.schema";
import type { LoginResponse } from "@/types/auth.types";

export const useAuth = () => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(credentials);

      // Store tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      // Set user state
      setUser(response.user);

      // Redirect to dashboard
      navigate("/dashboard");

      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Force logout even if API fails
      localStorage.clear();
      setUser(null);
      navigate("/login");
    }
  };

  return { user, loading, error, login, logout };
};
