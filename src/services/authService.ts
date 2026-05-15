import httpClient from '../api/httpClient';
import type { AuthCredentials, AuthResponse, RegisterPayload } from '../types/auth';

export const authService = {
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const { data: responseData } = await httpClient.post<AuthResponse>('/auth/register', data);
    return responseData;
  },

  login: async (data: AuthCredentials): Promise<AuthResponse> => {
    const { data: responseData } = await httpClient.post<AuthResponse>('/auth/login', data);
    return responseData;
  },

  logout: async (): Promise<void> => {
    try {
      await httpClient.post('/auth/logout');
    } catch {
      // Clear local session even if the backend logout endpoint is unavailable.
    }
  },

  getCurrentUser: async () => {
    const { data } = await httpClient.get('/auth/me');
    return data;
  },
};

export const register = authService.register;
export const login = authService.login;
