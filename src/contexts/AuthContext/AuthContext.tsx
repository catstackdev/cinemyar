import { useState, useCallback, type ReactNode, useEffect } from "react";
import { AuthContext } from "./context";
import type { User } from "./AuthContext.types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: "1",
        email,
        username: "John Doe",
        role: "admin", // Default role for mock user
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUser: User = {
          id: Date.now().toString(),
          email,
          username: name,
          role: "user", // Default role for registered user
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
        };

        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
