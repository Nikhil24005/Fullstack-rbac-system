import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/Loader';
import type { Role } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, token, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  // Ensure token exists
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
