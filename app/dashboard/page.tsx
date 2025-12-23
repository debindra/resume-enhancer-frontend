'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDashboard, type DashboardStats, type RecentOptimization } from '@/services/dashboardClient';
import SubscriptionStatus from '@/components/SubscriptionStatus';

export default function DashboardPage() {
  const { user, session, loading: authLoading, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOptimizations, setRecentOptimizations] = useState<RecentOptimization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      loadDashboardData();
    } else if (!authLoading && !user) {
      // Redirect to home if not authenticated
      window.location.href = '/';
    }
  }, [user, authLoading]);

  async function loadDashboardData() {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboard(session?.access_token);
      setStats(data.stats);
      setRecentOptimizations(data.recent_optimizations);
    } catch (err: any) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      // No mock data fallback - show error state instead
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-neutral-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tierColors: Record<string, string> = {
    freemium: 'bg-neutral-lightest text-neutral',
    plus: 'bg-blue-100 text-blue-700',
    pro: 'bg-primary-muted text-primary',
    recruiter: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral sm:text-4xl">Dashboard</h1>
            <p className="mt-2 text-neutral-light">Welcome back, {user.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-lg border border-neutral-lightest bg-neutral-white px-4 py-2 text-sm font-medium text-neutral-light transition-colors hover:bg-neutral-lightest hover:text-neutral focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
          {error} (Showing mock data)
        </div>
      )}

      {/* Credit Balance & Tier */}
      <div className="mb-8 rounded-2xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-lighter">Current Plan</p>
            <div className="mt-1 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                  tierColors[stats?.tier || 'freemium']
                }`}
              >
                {stats?.tier || 'Freemium'}
              </span>
              {stats?.tier === 'freemium' && (
                <Link
                  href="/#pricing"
                  className="text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  Upgrade →
                </Link>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-lighter">Credits Remaining</p>
            <p className="mt-1 text-2xl font-bold text-neutral">
              {stats?.credits_remaining || 0} / {stats?.credits_total || 3}
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-neutral-lightest">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{
                  width: `${((stats?.credits_remaining || 0) / (stats?.credits_total || 3)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Status & Billing Management */}
      <div className="mb-8">
        <SubscriptionStatus userId={user.id} />
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-lighter">Total Optimizations</p>
          <p className="mt-2 text-3xl font-bold text-neutral">{stats?.total_optimizations || 0}</p>
        </div>
        <div className="rounded-2xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-lighter">This Month</p>
          <p className="mt-2 text-3xl font-bold text-neutral">{stats?.this_month_optimizations || 0}</p>
        </div>
        <div className="rounded-2xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-lighter">Avg. Score Improvement</p>
          <p className="mt-2 text-3xl font-bold text-primary">
            +{stats?.average_score_improvement?.toFixed(1) || '0.0'}%
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-lighter">Best ATS Score</p>
          <p className="mt-2 text-3xl font-bold text-accent">{stats?.best_ats_score || 0}</p>
        </div>
      </div>

      {/* Recent Optimizations */}
      <div className="mb-8 rounded-2xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral">Recent Optimizations</h2>
          <Link
            href="/#resume-analyzer"
            className="text-sm font-semibold text-primary hover:text-primary-dark"
          >
            New Analysis →
          </Link>
        </div>
        {recentOptimizations.length === 0 ? (
          <div className="py-8 text-center sm:py-12">
            <p className="text-sm text-neutral-light sm:text-base">No optimizations yet</p>
            <Link
              href="/#resume-analyzer"
              className="mt-4 inline-block rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-neutral-white transition hover:bg-primary-dark sm:px-6 sm:py-2.5 sm:text-base"
            >
              Start Your First Analysis
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="min-w-full px-6 sm:px-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-lightest">
                    <th className="pb-3 text-left text-xs font-semibold uppercase text-neutral-lighter">
                      Resume
                    </th>
                    <th className="hidden pb-3 text-left text-xs font-semibold uppercase text-neutral-lighter sm:table-cell">
                      Job Title
                    </th>
                    <th className="pb-3 text-left text-xs font-semibold uppercase text-neutral-lighter">
                      ATS Score
                    </th>
                    <th className="hidden pb-3 text-left text-xs font-semibold uppercase text-neutral-lighter md:table-cell">
                      Date
                    </th>
                    <th className="pb-3 text-right text-xs font-semibold uppercase text-neutral-lighter">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOptimizations.map((opt) => (
                    <tr key={opt.id} className="border-b border-neutral-lightest/50">
                      <td className="py-3 text-xs font-medium text-neutral sm:py-4 sm:text-sm">
                        <div className="flex flex-col">
                          <span>{opt.resume_name}</span>
                          <span className="text-xs text-neutral-lighter sm:hidden">{opt.job_title}</span>
                        </div>
                      </td>
                      <td className="hidden py-4 text-sm text-neutral-light sm:table-cell">{opt.job_title}</td>
                      <td className="py-3 sm:py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary sm:px-3 sm:text-sm">
                          {opt.ats_score}
                        </span>
                      </td>
                      <td className="hidden py-4 text-xs text-neutral-lighter md:table-cell sm:text-sm">
                        {new Date(opt.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right sm:py-4">
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/dashboard/optimizations/${opt.id}` +
                                `?resume_name=${encodeURIComponent(opt.resume_name)}` +
                                `&job_title=${encodeURIComponent(opt.job_title)}` +
                                `&ats_score=${encodeURIComponent(String(opt.ats_score))}` +
                                `&created_at=${encodeURIComponent(opt.created_at)}`
                            )
                          }
                          className="text-xs font-semibold text-primary hover:text-primary-dark sm:text-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/#resume-analyzer"
          className="group rounded-2xl border border-neutral-lightest bg-gradient-to-br from-primary to-primary-light p-6 text-neutral-white shadow-sm transition hover:shadow-lg"
        >
          <h3 className="text-lg font-bold">Optimize Resume</h3>
          <p className="mt-2 text-sm text-white/90">
            Upload your resume and get AI-powered optimization suggestions
          </p>
          <span className="mt-4 inline-block text-sm font-semibold group-hover:translate-x-1 transition">
            Get Started →
          </span>
        </Link>
        <Link
          href="/documentation"
          className="group rounded-2xl border border-neutral-lightest bg-gradient-to-br from-neutral-white to-neutral-white/50 p-6 shadow-sm transition hover:shadow-lg"
        >
          <h3 className="text-lg font-bold text-neutral">Learn More</h3>
          <p className="mt-2 text-sm text-neutral-light">
            Read our documentation to get the most out of CareerLift AI
          </p>
          <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:translate-x-1 transition">
            View Docs →
          </span>
        </Link>
      </div>
    </div>
  );
}

