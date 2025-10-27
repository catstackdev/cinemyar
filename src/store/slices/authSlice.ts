import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "@/lib/axios";
import type { LoginFormData } from "@/features/auth/Login/schemas/auth.schema";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }: LoginFormData & { rememberMe?: boolean }) => {
    const response = await apiClient.post("/auth/login", { email, password });
    
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
    }
    
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await apiClient.post("/auth/logout");
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message || "Login failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
