import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, RefreshAuthResponse, User } from "./auth.types";
import { login, logout, checkAuth } from "./auth.thunks";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isLoading: false,
  error: null,
};

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
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<RefreshAuthResponse>) => {
          state.isAuthenticated = true;
          state.accessToken = action.payload.access_token;
          state.user = action.payload.user;
        },
      )
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

