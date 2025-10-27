import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/api/auth.api";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
    },
  });
};
