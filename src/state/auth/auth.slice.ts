import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, RefreshAuthResponse, User } from "./auth.types";
import { login, register, logout, checkAuth } from "./auth.thunks";

// Cookie-based auth: no localStorage needed
const getInitialAuthState = (): AuthState => {
  console.log("🔐 Auth Slice: Initializing auth state (cookie-based)");

  return {
    user: null,
    isAuthenticated: false, // Will be validated by checkAuth
    accessTokenExpiresAt: null,
    isLoading: true, // Always check on mount
    error: null,
    hasInitialized: false, // Track if we've attempted validation
  };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state) => {
      localStorage.removeItem("accessTokenExpiresAt");
      state.hasInitialized = true;
      state.isLoading = false;
      state.accessTokenExpiresAt = null;
    },
    updateAuthFromRefresh: (
      state,
      action: PayloadAction<RefreshAuthResponse>,
    ) => {
      state.user = action.payload.user;
      state.accessTokenExpiresAt = action.payload.accessTokenExpiresAt;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User;
            accessTokenExpiresAt: number | null;
          }>,
        ) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.accessTokenExpiresAt = action.payload?.accessTokenExpiresAt; // Not used with cookie auth
          state.user = action.payload.user;
          state.error = null;
          state.hasInitialized = true;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: User;
            accessTokenExpiresAt: number | null;
          }>,
        ) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.accessTokenExpiresAt = action.payload?.accessTokenExpiresAt;
          state.user = action.payload.user;
          state.error = null;
          state.hasInitialized = true;
        },
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.hasInitialized = true; // Keep initialized
        // Cookie-based: backend clears cookies
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuth.pending, (state) => {
        console.log("🔐 Auth Slice: checkAuth.pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<RefreshAuthResponse>) => {
          console.log("🔐 Auth Slice: checkAuth.fulfilled", action.payload);
          state.isLoading = false;
          state.isAuthenticated = true;
          state.accessTokenExpiresAt = action.payload?.accessTokenExpiresAt;
          state.user = action.payload.user;
          state.error = null;
          state.hasInitialized = true;
        },
      )
      .addCase(checkAuth.rejected, (state, action) => {
        console.log("🔐 Auth Slice: checkAuth.rejected", action.error);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.error = null; // Don't show error for no cookie
        state.hasInitialized = true;
      });
  },
});

export const { clearError, setInitialized, updateAuthFromRefresh } =
  authSlice.actions;
export default authSlice.reducer;
