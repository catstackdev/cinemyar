import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { AuthState } from "./auth.types";

// Base selector
const selectAuthState = (state: RootState): AuthState => state.auth;

// Memoized selectors
export const selectAuthUser = createSelector(
  [selectAuthState],
  (auth) => auth.user,
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading,
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error,
);

export const selectAuthId = createSelector(
  [selectAuthUser],
  (user) => user?.id ?? null,
);

