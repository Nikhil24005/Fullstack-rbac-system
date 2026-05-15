import axios from 'axios';

interface ErrorPayload {
  message?: string;
  error?: string;
}

export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong. Please try again.') => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ErrorPayload | string | undefined;

    if (typeof payload === 'string' && payload.trim()) {
      return payload;
    }

    if (payload && typeof payload === 'object') {
      return payload.message || payload.error || error.message || fallback;
    }

    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
