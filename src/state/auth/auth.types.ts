export interface User {
  id: string;
  email: string;
  username?: string;
  role?: string;
  subscription?: any;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken?: string | null;
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

