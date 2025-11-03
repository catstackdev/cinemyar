export interface User {
  id: string;
  email: string;
  username?: string;
  role?: string;
  avatar?: string;
  subscription?: any;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken?: string | null;
  hasInitialized?: boolean; // Track if we've attempted initial validation
}

export interface RefreshAuthResponse {
  access_token: string | null;
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
