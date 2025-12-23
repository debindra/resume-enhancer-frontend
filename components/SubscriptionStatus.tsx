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
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  if (!balance) {
    return null
  }

  const isLowCredits = balance.remaining < 2
  const creditsPercentage = balance.total > 0 ? (balance.remaining / balance.total) * 100 : 0

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Subscription Status</h3>
        {balance.tier === 'freemium' && (
          <Link
            href="/pricing"
            className="text-sm bg-primary text-neutral-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Upgrade to Pro
          </Link>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Current Plan</span>
          <span className="text-sm font-semibold text-gray-900 capitalize">{balance.tier}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Credits</span>
          <span className="text-sm font-semibold text-gray-900">
            {balance.remaining} / {balance.total}
          </span>
        </div>
        
        {/* Credit progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className={`h-2 rounded-full ${
              isLowCredits ? 'bg-red-500' : creditsPercentage > 50 ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${Math.min(creditsPercentage, 100)}%` }}
          ></div>
        </div>

        {isLowCredits && balance.tier === 'freemium' && (
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              Low credits! <Link href="/pricing" className="underline font-semibold">Upgrade to Pro</Link> for 10x more credits.
            </p>
          </div>
        )}
      </div>

      {billingCycle && billingCycle.next_reset && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Next Credit Reset</span>
            <span className="text-sm text-gray-600">
              {billingCycle.days_until_reset !== null
                ? `${billingCycle.days_until_reset} days`
                : 'N/A'}
            </span>
          </div>
          {billingCycle.current_period_end && (
            <p className="text-xs text-gray-500">
              {new Date(billingCycle.current_period_end).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {balance.tier === 'pro' && (
        <div className="mt-4 border-t pt-4">
          <a
            href="https://billing.stripe.com/p/login" // Stripe Customer Portal - update with your portal URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Manage Subscription →
          </a>
        </div>
      )}
    </div>
  )
}

