import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '../../_lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
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

    // Get user profile
    let { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('tier, credits_remaining, credits_total')
      .eq('user_id', userId)
      .single()

    // Create user profile if it doesn't exist
    if (profileError && profileError.code === 'PGRST116') {
      // Profile doesn't exist, create it
      const { error: createError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          tier: 'freemium',
          credits_remaining: 3,
          credits_total: 3,
        })

      if (createError) {
        console.error('Error creating user profile:', createError)
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
    
    const thisMonthOptimizations = optimizations?.filter(opt => {
      const optDate = new Date(opt.created_at)
      return optDate >= currentMonth
    }).length || 0

    const scores = optimizations?.map(opt => opt.ats_score).filter(score => score != null) || []
    const averageAtsScore = scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0
    const bestAtsScore = scores.length > 0 ? Math.max(...scores) : 0

    const stats = {
      total_optimizations: totalOptimizations,
      this_month_optimizations: thisMonthOptimizations,
      average_score_improvement: Math.round(averageAtsScore * 100) / 100,
      best_ats_score: Math.round(bestAtsScore * 100) / 100,
      credits_remaining: profile?.credits_remaining || 3,
      credits_total: profile?.credits_total || 3,
      tier: profile?.tier || 'freemium'
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Dashboard stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}