export type Role = 'USER' | 'ADMIN';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  name: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
  message?: string;
}

export interface DashboardSummary {
  title: string;
  subtitle: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setSession: (session: AuthResponse) => void;
  register: (data: RegisterPayload) => Promise<void>;
  login: (data: AuthCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type User = AuthUser;
export type LoginRequest = AuthCredentials;
export type RegisterRequest = RegisterPayload;
