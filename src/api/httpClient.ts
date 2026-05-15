import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { clearAuthSession, getStoredToken } from '../services/storage';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();

  if (token) {
    config.headers = AxiosHeaders.from(config.headers);
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthSession();
      try {
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          window.location.replace('/login');
        }
      } catch (e) {
        // ignore (non-browser environment)
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;
