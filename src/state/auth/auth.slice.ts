import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, RefreshAuthResponse, User } from "./auth.types";
import { login, logout, checkAuth } from "./auth.thunks";

// Initialize state from localStorage if available
const getInitialAuthState = (): AuthState => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("🔐 Auth Slice: Initializing auth state", { accessToken: !!accessToken });
  
  return {
    user: null,
    isAuthenticated: false, // Will be validated by checkAuth
    accessToken: accessToken,
    isLoading: !!accessToken, // Start loading if we have a token to validate
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
      state.hasInitialized = true;
      state.isLoading = false;
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
          action: PayloadAction<{ user: User; access_token: string }>,
        ) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.accessToken = action.payload.access_token;
          state.user = action.payload.user;
          state.error = null;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        state.error = action.error.message || "Login failed";
      })
       .addCase(logout.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(logout.fulfilled, (state) => {
         state.isLoading = false;
         state.isAuthenticated = false;
         state.accessToken = null;
         state.user = null;
         state.hasInitialized = false; // Reset on logout
         localStorage.removeItem("accessToken");
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
           state.accessToken = action.payload?.access_token;
           state.user = action.payload.user;
           state.error = null;
           state.hasInitialized = true;
           
           // Update localStorage with new token if provided
           if (action.payload?.access_token) {
             localStorage.setItem("accessToken", action.payload.access_token);
           }
         },
       )
       .addCase(checkAuth.rejected, (state, action) => {
         console.log("🔐 Auth Slice: checkAuth.rejected", action.error);
         state.isLoading = false;
         state.isAuthenticated = false;
         state.accessToken = null;
         state.user = null;
         state.error = "Authentication validation failed";
         state.hasInitialized = true;
         
         // Clear invalid token from localStorage
         localStorage.removeItem("accessToken");
       });
  },
});

export const { clearError, setInitialized } = authSlice.actions;
export default authSlice.reducer;
