import type { AuthUser } from '../types/auth';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = (): AuthUser | null => {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setAuthSession = (token: string, user: AuthUser) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
