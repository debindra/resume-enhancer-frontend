import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '../_lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const hasBearer = authHeader?.startsWith('Bearer ')

    let userId: string | null = null

    // If a Bearer token is provided, use it to authenticate and to authorize DB calls (RLS)
    if (hasBearer) {
      const accessToken = authHeader!.slice(7)

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase env vars not set in dashboard route')
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }

      // Client that sends the Bearer token with all requests so RLS sees auth.uid()
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

      if (userError) {
        console.error('Error verifying access token in dashboard route:', userError)
      }

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      userId = user.id

      // Use this client for all subsequent queries
      return await buildDashboardResponse(supabase, userId)
    }

    // Fallback: authenticate using session from cookies (SSR Supabase client)
    const supabase = await createSupabaseServerClient()

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Error getting session in dashboard route:', sessionError)
    }

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    userId = session.user.id

    return await buildDashboardResponse(supabase, userId)

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function buildDashboardResponse(supabase: any, userId: string) {
  // Get user profile
  let { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('tier, credits_remaining, credits_total')
    .eq('user_id', userId)
    .single()

    // Create user profile if it doesn't exist
    if (profileError && profileError.code === 'PGRST116') {
      // Profile doesn't exist, attempt to create it
      const { error: createError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          tier: 'freemium',
          credits_remaining: 3,
          credits_total: 3,
        })

      if (createError) {
        // If RLS blocks the insert, silently fall back to default freemium profile
        if (createError.code === '42501') {
          // Permission denied by RLS; we'll just use default values below
          profile = null
        } else {
          console.error('Error creating user profile:', createError)
        }
      } else {
        // Fetch the newly created profile
        const { data: newProfile } = await supabase
          .from('user_profiles')
          .select('tier, credits_remaining, credits_total')
          .eq('user_id', userId)
          .single()
        profile = newProfile
      }
    } else if (profileError) {
      console.error('Error fetching user profile:', profileError)
    }

  // Get optimizations for stats
  const { data: optimizations, error: optError } = await supabase
    .from('resume_optimizations')
    .select('ats_score, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (optError) {
    console.error('Error fetching optimizations:', optError)
  }

  // Calculate stats
  const totalOptimizations = optimizations?.length || 0
  
  const currentMonth = new Date()
  currentMonth.setDate(1)
  currentMonth.setHours(0, 0, 0, 0)
  
  const thisMonthOptimizations = optimizations?.filter((opt: any) => {
    const optDate = new Date(opt.created_at)
    return optDate >= currentMonth
  }).length || 0

  const scores = optimizations?.map((opt: any) => opt.ats_score).filter((score: number | null) => score != null) || []
  const averageAtsScore = scores.length > 0
    ? scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length
    : 0
  const bestAtsScore = scores.length > 0 ? Math.max(...scores) : 0

  const stats = {
    total_optimizations: totalOptimizations,
    this_month_optimizations: thisMonthOptimizations,
    average_score_improvement: Math.round(averageAtsScore * 100) / 100,
    best_ats_score: Math.round(bestAtsScore * 100) / 100,
    credits_remaining: profile?.credits_remaining ?? 3,
    credits_total: profile?.credits_total ?? 3,
    tier: profile?.tier || 'freemium'
  }

  // Get recent optimizations
  const { data: recentOpts, error: recentError } = await supabase
    .from('resume_optimizations')
    .select('id, resume_name, job_title, ats_score, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10)

  if (recentError) {
    console.error('Error fetching recent optimizations:', recentError)
  }

  const recentOptimizations = (recentOpts || []).map((opt: any) => ({
    id: opt.id,
    resume_name: opt.resume_name || 'Untitled Resume',
    job_title: opt.job_title || 'Unknown Position',
    ats_score: opt.ats_score || 0,
    created_at: opt.created_at
  }))

  return NextResponse.json({
    stats,
    recent_optimizations: recentOptimizations
  })
}