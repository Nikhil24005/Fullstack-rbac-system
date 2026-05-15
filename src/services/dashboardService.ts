import httpClient from '../api/httpClient';
import type { DashboardSummary } from '../types/auth';

export const getDashboardSummary = async () => {
  const { data } = await httpClient.get<DashboardSummary>('/dashboard/summary');
  return data;
};
