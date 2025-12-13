import type { AuthUserRole } from "@/types/auth-enums.types";

export type UserRole = AuthUserRole;

export interface User {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
  avatar?: string;
  subscription?: any;
  permissions?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // accessToken?: string | null;
  accessTokenExpiresAt?: number | null;
  hasInitialized?: boolean; // Track if we've attempted initial validation
}

export interface RefreshAuthResponse {
  accessTokenExpiresAt: number | null;
  user: User | null;
}

// Action payload types
// export interface CreateAuthPayload {
//   name: string;
//   description?: string;
// }
//
// export interface UpdateAuthPayload {
//   id: string;
//   updates: Partial<AuthItem>;
// }
//
