'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PricingPage() {
  const { user, session, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkoutStatus = searchParams.get('checkout')

  useEffect(() => {
    if (checkoutStatus === 'success') {
      // Show success message
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    }
  }, [checkoutStatus, router])

  const handleUpgrade = async (priceId: string) => {
    if (!user) {
      router.push('/login')
      return
    }

    if (!session?.access_token) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ price_id: priceId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const data = await response.json()
      
      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Failed to start checkout')
      setLoading(false)
    }
  }

  // Get price IDs from environment (these should be set)
  const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
  const annualPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_ANNUAL

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-light">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-white via-neutral-white/40 to-primary-muted/20 py-10 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Hero */}
        <header className="mb-10 sm:mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-muted px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Pricing
          </span>
          <h1 className="mb-3 text-3xl font-bold text-neutral sm:text-4xl md:text-5xl">
            Simple Pricing. <span className="text-primary">All Features Included.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-neutral-light sm:text-lg">
            Choose the plan that fits your job search. Same AI features, different monthly credits.
          </p>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-neutral-lighter sm:text-sm">
            <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure payments powered by Stripe. Cancel anytime.
          </p>
        </header>

        {/* Status + Errors */}
        <div className="mb-6 space-y-3 sm:mb-8">
          {checkoutStatus === 'success' && (
              <div className="rounded-2xl border border-secondary-muted bg-secondary-muted/80 p-4 text-sm text-secondary-dark shadow-sm">
              <p className="font-semibold">Payment successful! Redirecting to your dashboard...</p>
              <p className="mt-1 text-xs text-green-900/90">
                You can start using your new credits right away.
              </p>
            </div>
          )}

          {checkoutStatus === 'cancelled' && (
            <div className="rounded-2xl border border-yellow-100 bg-yellow-50/80 p-4 text-sm text-yellow-900 shadow-sm">
              <p className="font-semibold">Checkout cancelled.</p>
              <p className="mt-1 text-xs text-yellow-900/90">
                No charges were made. You can upgrade again anytime.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50/80 p-4 text-sm text-red-900 shadow-sm">
              <p className="font-semibold">Something went wrong starting checkout.</p>
              <p className="mt-1 text-xs text-red-900/90">{error}</p>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <section aria-label="Pricing plans" className="mb-10 sm:mb-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Freemium Tier */}
            <div className="relative rounded-2xl border-2 border-neutral-lightest bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral mb-2">Freemium</h2>
                <p className="text-sm text-neutral-light mb-3">Perfect for trying the product.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-neutral sm:text-5xl">$0</span>
                  <span className="text-neutral-light">/month</span>
                </div>
              </div>

              <ul className="mb-8 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">3 credits per month</p>
                    <p className="text-xs text-neutral-light">Enough for 3 full optimizations.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">All AI features included</p>
                    <p className="text-xs text-neutral-light">
                      Resume optimization, cover letters, LinkedIn enhancements, ATS scans.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">Resume history & versioning</p>
                    <p className="text-xs text-neutral-light">
                      Track improvements and keep multiple versions.
                    </p>
                  </div>
                </li>
              </ul>

              <button
                disabled
                className="w-full rounded-lg bg-neutral-lightest py-3 px-6 text-sm font-semibold text-neutral cursor-not-allowed"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Tier */}
            <div className="relative rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-lg">
                  Most Popular
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral mb-2">Pro</h2>
                <p className="text-sm text-neutral-light mb-3">Best for active job seekers.</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-neutral sm:text-5xl">$29</span>
                  <span className="text-neutral-light">/month</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-primary">
                  or $24/month billed annually (save $60/year)
                </p>
              </div>

              <ul className="mb-8 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">30 credits per month</p>
                    <p className="text-xs text-neutral-light">
                      10x more than Freemium — ideal for multiple applications each week.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">Same AI features as Freemium</p>
                    <p className="text-xs text-neutral-light">
                      You get the exact same feature set — just more monthly usage.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-neutral">Priority support</p>
                    <p className="text-xs text-neutral-light">
                      Faster help if anything goes wrong during your applications.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="space-y-3">
                {monthlyPriceId && (
                  <button
                    onClick={() => handleUpgrade(monthlyPriceId)}
                    disabled={loading}
                    className="w-full rounded-lg bg-primary py-3 px-6 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-dark hover:shadow-xl disabled:cursor-not-allowed disabled:bg-neutral-light"
                  >
                    {loading ? 'Processing...' : 'Upgrade to Pro – Monthly'}
                  </button>
                )}
                {annualPriceId && (
                  <button
                    onClick={() => handleUpgrade(annualPriceId)}
                    disabled={loading}
                    className="w-full rounded-lg bg-neutral-white py-3 px-6 text-sm font-semibold text-primary ring-1 ring-primary/40 shadow-sm transition hover:bg-primary/5 hover:shadow-md disabled:cursor-not-allowed disabled:bg-neutral-lightest"
                  >
                    {loading ? 'Processing...' : 'Upgrade to Pro – Annual (Best Value)'}
                  </button>
                )}
                {!monthlyPriceId && !annualPriceId && (
                  <p className="text-center text-xs text-neutral-light">
                    Stripe price IDs are not configured. Please set your{" "}
                    <code className="rounded bg-neutral-lightest px-1 py-0.5 text-[0.7rem] font-mono">
                      NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_*
                    </code>{" "}
                    environment variables.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Credit Costs */}
        <section className="mb-10 sm:mb-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-lightest bg-white/80 p-6 shadow-sm sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-neutral text-center sm:text-2xl">
              Credit Costs (Same for Both Plans)
            </h2>
            <p className="mb-6 text-center text-xs text-neutral-light sm:text-sm">
              Every feature uses a single credit. The only difference between Freemium and Pro is how many
              credits you receive each month.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg bg-neutral-lightest/60 px-4 py-3">
                <span className="text-sm font-medium text-neutral">Resume Optimization</span>
                <span className="text-sm font-bold text-primary">1 credit</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-neutral-lightest/60 px-4 py-3">
                <span className="text-sm font-medium text-neutral">Cover Letter Generation</span>
                <span className="text-sm font-bold text-primary">1 credit</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-neutral-lightest/60 px-4 py-3">
                <span className="text-sm font-medium text-neutral">LinkedIn Enhancement</span>
                <span className="text-sm font-bold text-primary">1 credit</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-neutral-lightest/60 px-4 py-3">
                <span className="text-sm font-medium text-neutral">ATS Deep Scan</span>
                <span className="text-sm font-bold text-primary">1 credit</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-light sm:gap-8 sm:text-sm">
            <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="font-medium">Secure payment via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">No hidden fees</span>
          </div>
        </section>
      </div>
    </div>
  )
}

