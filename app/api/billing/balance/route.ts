import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '../../_lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

// Tier definitions matching Python backend
const TIER_CREDITS = {
  freemium: 3,
  plus: 15,
  pro: 50,
  recruiter: 200,
}

const CREDIT_COSTS = {
  optimization: 1,
  cover_letter: 1,
  linkedin: 1,
  ats_deep_scan: 1,
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const hasBearer = authHeader?.startsWith('Bearer ')

    // Prefer Bearer token if provided (used by client-side dashboard with supabase-js session)
    if (hasBearer) {
      const accessToken = authHeader!.slice(7)

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase env vars not set in billing balance route')
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      })

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(accessToken)

      if (userError || !user) {
        if (userError) {
          console.error('Error verifying access token in billing balance route:', userError)
        }
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      const userId = user.id
      const balance = await getBalance(supabase, userId)
      return NextResponse.json(balance)
    }

    // Fallback: cookie-based session for SSR or non-Bearer clients
    const supabase = await createSupabaseServerClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Error getting session in billing balance route:', sessionError)
    }

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get user's balance
    const balance = await getBalance(supabase, userId)

    return NextResponse.json(balance)

  } catch (error) {
    console.error('Billing balance API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const hasBearer = authHeader?.startsWith('Bearer ')

    // Prefer Bearer token if provided (used by client-side dashboard with supabase-js session)
    if (hasBearer) {
      const accessToken = authHeader!.slice(7)

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase env vars not set in billing balance route')
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      })

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(accessToken)

      if (userError || !user) {
        if (userError) {
          console.error('Error verifying access token in billing balance route:', userError)
        }
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      const userId = user.id
      const body = await request.json()
      const { event } = body

      if (!event || !CREDIT_COSTS[event as keyof typeof CREDIT_COSTS]) {
        return NextResponse.json(
          { error: 'Invalid event type' },
          { status: 400 }
        )
      }

      // Consume credit
      const balance = await consumeCredit(supabase, userId, event)

      return NextResponse.json(balance)
    }

    // Fallback: cookie-based session for SSR or non-Bearer clients
    const supabase = await createSupabaseServerClient()

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const body = await request.json()
    const { event } = body

    if (!event || !CREDIT_COSTS[event as keyof typeof CREDIT_COSTS]) {
      return NextResponse.json(
        { error: 'Invalid event type' },
        { status: 400 }
      )
    }

    // Consume credit
    const balance = await consumeCredit(supabase, userId, event)

    return NextResponse.json(balance)

  } catch (error: any) {
    console.error('Billing consume credit API error:', error)

    if (error.message?.includes('Insufficient credits')) {
      return NextResponse.json(
        { error: error.message },
        { status: 402 } // Payment required
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getBalance(supabase: any, userId: string) {
  // Get or create user profile
  let { data: profile, error } = await supabase
    .from('user_profiles')
    .select('tier, credits_remaining, credits_total')
    .eq('user_id', userId)
    .single()

  // If profile doesn't exist, create one
  if (error && error.code === 'PGRST116') {
    const { data: newProfile, error: createError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        tier: 'freemium',
        credits_remaining: 3,
        credits_total: 3
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating user profile:', createError)
      // If RLS blocks the insert, silently fall back to default freemium profile
      if (createError.code === '42501') {
        profile = null
      } else {
        throw createError
      }
    }

    profile = newProfile
  } else if (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }

  return {
    remaining: profile?.credits_remaining ?? 3,
    tier: profile?.tier ?? 'freemium',
    total: profile?.credits_total ?? 3
  }
}

async function consumeCredit(supabase: any, userId: string, event: string) {
  // Get current balance
  const balance = await getBalance(supabase, userId)
  const cost = CREDIT_COSTS[event as keyof typeof CREDIT_COSTS] || 1

  if (balance.remaining < cost) {
    throw new Error(`Insufficient credits. Required: ${cost}, Available: ${balance.remaining}`)
  }

  const newRemaining = balance.remaining - cost

  // Update credits in database
  const { data: updatedProfile, error: updateError } = await supabase
    .from('user_profiles')
    .update({ credits_remaining: newRemaining })
    .eq('user_id', userId)
    .select()
    .single()

  if (updateError) {
    console.error('Error updating credits:', updateError)
    throw updateError
  }

  // Log usage event
  const { error: logError } = await supabase
    .from('credit_usage_logs')
    .insert({
      user_id: userId,
      event_type: event,
      credits_used: cost,
      remaining_after: newRemaining,
      metadata: {}
    })

  if (logError) {
    console.error('Error logging credit usage:', logError)
    // Don't throw - credit was consumed, logging is non-critical
  }

  return {
    remaining: updatedProfile.credits_remaining,
    tier: updatedProfile.tier,
    total: updatedProfile.credits_total
  }
}