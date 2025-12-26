'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function OptimizationDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resumeName = searchParams.get('resume_name') || 'Untitled Resume';
  const jobTitle = searchParams.get('job_title') || 'Unknown Position';
  const atsScore = searchParams.get('ats_score');
  const createdAt = searchParams.get('created_at');

  const hasBasicData = !!atsScore || !!createdAt || !!resumeName || !!jobTitle;

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8 sm:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark"
      >
        ← Back to dashboard
      </button>

      {!hasBasicData ? (
        <div className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-6">
          <h1 className="text-base font-medium text-neutral sm:text-lg">Optimization details unavailable</h1>
          <p className="mt-2 text-sm text-neutral-light">
            This page works best when opened from your dashboard&apos;s Recent Optimizations list so we can include
            summary details in the link. Please return to the dashboard and click &quot;View&quot; again.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-lighter">Optimization Detail</p>
            <h1 className="mt-1 text-xl font-medium text-neutral sm:text-2xl">{resumeName}</h1>
            <p className="mt-1 text-sm text-neutral-light">
              Job title: <span className="font-medium text-neutral">{jobTitle}</span>
            </p>
            <p className="mt-1 text-xs text-neutral-lighter">
              Created {createdAt ? new Date(createdAt).toLocaleString() : 'Unknown time'}
            </p>
          </div>

          <div className="mb-6 flex items-center gap-3">
            {atsScore && (
              <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                ATS Score: {atsScore}
              </span>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-6">
            <h2 className="text-base font-medium text-neutral sm:text-lg">Full optimization details</h2>
            <p className="mt-2 text-sm text-neutral-light">
              This page currently shows a summary of your optimization (resume name, job title, score, and date).
              We don&apos;t yet display the full optimized resume text here, but you can re-run an analysis from the
              dashboard if you need a fresh version.
            </p>
          </div>
        </>
      )}
    </div>
  );
}


