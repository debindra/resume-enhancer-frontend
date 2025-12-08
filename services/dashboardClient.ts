import axios from 'axios';
import { supabase } from '@/lib/supabase/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface DashboardStats {
  total_optimizations: number;
  this_month_optimizations: number;
  average_score_improvement: number;
  best_ats_score: number;
  credits_remaining: number;
  credits_total: number;
  tier: string;
}

export interface RecentOptimization {
  id: string;
  resume_name: string;
  job_title: string;
  ats_score: number;
  created_at: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recent_optimizations: RecentOptimization[];
}

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('Not authenticated');
  }
  return {
    Authorization: `Bearer ${session.access_token}`,
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/dashboard/stats`, { headers });
  return response.data;
}

export async function getRecentOptimizations(limit = 10): Promise<RecentOptimization[]> {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/dashboard/optimizations`, {
    headers,
    params: { limit },
  });
  return response.data;
}

export async function getDashboard(): Promise<DashboardData> {
  const headers = await getAuthHeaders();
  const response = await axios.get(`${API_BASE_URL}/dashboard`, { headers });
  return response.data;
}

