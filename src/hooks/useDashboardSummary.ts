import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '../services/dashboardService';
import { useAuth } from './useAuth';

export const useDashboardSummary = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};
