// Use Next.js API routes instead of FastAPI backend
// Next.js API routes handle authentication via cookies automatically
const API_BASE_URL = '/api';

interface ErrorResponse {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

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

async function handleResponse<T>(response: Response, url: string): Promise<T> {
  if (!response.ok) {
    const status = response.status;
    const statusText = response.statusText;
    let errorMessage = 'Unable to fetch dashboard data.';
    let errorDetails: ErrorResponse | null = null;

    try {
      const errorText = await response.text();
      if (errorText) {
        try {
          const errorJson = JSON.parse(errorText);
          errorDetails = errorJson;
          if (errorJson?.error) {
            errorMessage = typeof errorJson.error === 'string' ? errorJson.error : errorJson.error.message || 'Unknown error';
          } else if (errorJson?.message) {
            errorMessage = errorJson.message;
          } else {
            errorMessage = errorText;
          }
        } catch {
          errorMessage = errorText || `Server returned ${status} ${statusText}`;
        }
      } else {
        errorMessage = `Server returned ${status} ${statusText}`;
      }
    } catch (readError) {
      console.error('[Dashboard] Failed to read error response:', {
        error: readError,
        status,
        statusText,
        url,
      });
      errorMessage = `Unable to fetch dashboard data. Server returned ${status} ${statusText}.`;
    }

    const error = new Error(errorMessage) as Error & { status?: number; statusText?: string; details?: ErrorResponse | null };
    error.status = status;
    error.statusText = statusText;
    error.details = errorDetails;
    throw error;
  }

  try {
    return await response.json();
  } catch (parseError) {
    console.error('[Dashboard] Failed to parse response as JSON:', {
      error: parseError,
      url,
      status: response.status,
    });
    throw new Error('Invalid response format from server');
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const url = `${API_BASE_URL}/dashboard/stats`;
  let response: Response;

  try {
    response = await fetch(url, {
      credentials: 'include', // Ensure cookies are sent
    });
  } catch (networkError) {
    console.error('[Dashboard] Network error during fetch:', {
      error: networkError,
      url,
      message: networkError instanceof Error ? networkError.message : String(networkError),
    });
    throw new Error('Network error: Unable to connect to the server');
  }

  return handleResponse<DashboardStats>(response, url);
}

export async function getRecentOptimizations(limit = 10): Promise<RecentOptimization[]> {
  const url = `${API_BASE_URL}/dashboard/optimizations?limit=${limit}`;
  let response: Response;

  try {
    response = await fetch(url, {
      credentials: 'include', // Ensure cookies are sent
    });
  } catch (networkError) {
    console.error('[Dashboard] Network error during fetch:', {
      error: networkError,
      url,
      message: networkError instanceof Error ? networkError.message : String(networkError),
    });
    throw new Error('Network error: Unable to connect to the server');
  }

  return handleResponse<RecentOptimization[]>(response, url);
}

export async function getDashboard(accessToken?: string): Promise<DashboardData> {
  const url = `${API_BASE_URL}/dashboard`;
  let response: Response;

  try {
    response = await fetch(url, {
      credentials: 'include', // Ensure cookies are sent
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    });
  } catch (networkError) {
    console.error('[Dashboard] Network error during fetch:', {
      error: networkError,
      url,
      message: networkError instanceof Error ? networkError.message : String(networkError),
    });
    throw new Error('Network error: Unable to connect to the server');
  }

  return handleResponse<DashboardData>(response, url);
}

