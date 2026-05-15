import { createContext, useMemo, useState, type ReactNode } from 'react';
import { authService } from '../services/authService';
import { clearAuthSession, getStoredToken, getStoredUser, setAuthSession } from '../services/storage';
import type { AuthContextType, AuthCredentials, AuthResponse, AuthUser, RegisterPayload } from '../types/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

const getAuthErrorMessage = (action: 'login' | 'register') => `${action === 'login' ? 'Login' : 'Registration'} failed.`;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [user, setUser] = useState<AuthUser | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSession = (session: AuthResponse) => {
    setAuthSession(session.token, session.user);
    setToken(session.token);
    setUser(session.user);
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(payload);
      setSession(response);
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : getAuthErrorMessage('register');
      setError(message);
      throw caughtError;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload: AuthCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(payload);
      setSession(response);
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : getAuthErrorMessage('login');
      setError(message);
      throw caughtError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthSession();
    setToken(null);
    setUser(null);
    void authService.logout();
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isLoading,
      error,
      setSession,
      register,
      login,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [error, isLoading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
