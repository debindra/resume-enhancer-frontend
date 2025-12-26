'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

interface SubscriptionStatusProps {
  userId: string
}

interface CreditBalance {
  remaining: number
  tier: string
  total: number
}

interface BillingCycleInfo {
  billing_cycle_anchor: string | null
  next_reset: string | null
  days_until_reset: number | null
  current_period_start: string | null
  current_period_end: string | null
}

export default function SubscriptionStatus({ userId }: SubscriptionStatusProps) {
  const [balance, setBalance] = useState<CreditBalance | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycleInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { session, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && session && userId) {
      loadSubscriptionData()
    }
  }, [authLoading, session, userId])

  async function loadSubscriptionData() {
    try {
      setLoading(true)
      setError(null)

      if (!session?.access_token) {
        throw new Error('Not authenticated')
      }

      // Fetch balance
      const balanceResponse = await fetch('/api/billing/balance', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        credentials: 'include',
      })

      if (!balanceResponse.ok) {
        throw new Error('Failed to fetch balance')
      }

      const balanceData = await balanceResponse.json()
      setBalance(balanceData)
    } catch (err: any) {
      console.error('Error loading subscription data:', err)
      setError(err.message || 'Failed to load subscription data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-neutral-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    )
  }

  if (!balance) {
    return null
  }

  const isLowCredits = balance.remaining < 2
  const creditsPercentage = balance.total > 0 ? (balance.remaining / balance.total) * 100 : 0

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-neutral sm:text-lg">Subscription Status</h3>
        {balance.tier === 'freemium' && (
          <Link
            href="/pricing"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-accent-dark hover:shadow-lg"
          >
            Upgrade to Pro
          </Link>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-lighter">Current Plan</span>
          <span className="text-sm font-medium text-neutral capitalize">{balance.tier}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-lighter">Credits</span>
          <span className="text-sm font-medium text-neutral">
            {balance.remaining} / {balance.total}
          </span>
        </div>
        
        {/* Credit progress bar */}
        <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2">
          <div
            className={`h-1.5 rounded-full ${
              isLowCredits ? 'bg-red-500' : creditsPercentage > 50 ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${Math.min(creditsPercentage, 100)}%` }}
          ></div>
        </div>

        {isLowCredits && balance.tier === 'freemium' && (
          <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-sm text-yellow-800">
              Low credits! <Link href="/pricing" className="font-medium underline">Upgrade to Pro</Link> for more credits.
            </p>
          </div>
        )}
      </div>

      {billingCycle && billingCycle.next_reset && (
        <div className="border-t border-neutral-200 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-lighter">Next Credit Reset</span>
            <span className="text-sm text-neutral-light">
              {billingCycle.days_until_reset !== null
                ? `${billingCycle.days_until_reset} days`
                : 'N/A'}
            </span>
          </div>
          {billingCycle.current_period_end && (
            <p className="text-xs text-neutral-lighter">
              {new Date(billingCycle.current_period_end).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {balance.tier === 'pro' && (
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <a
            href="https://billing.stripe.com/p/login"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            Manage Subscription →
          </a>
        </div>
      )}
    </div>
  )
}

