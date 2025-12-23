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

    // Get limit from query params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    // Get recent optimizations from database
    const { data: optimizations, error } = await supabase
      .from('resume_optimizations')
      .select('id, resume_name, job_title, ats_score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching optimizations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch optimizations' },
        { status: 500 }
      )
    }

    const recentOptimizations = (optimizations || []).map(opt => ({
      id: opt.id,
      resume_name: opt.resume_name || 'Untitled Resume',
      job_title: opt.job_title || 'Unknown Position',
      ats_score: opt.ats_score || 0,
      created_at: opt.created_at
    }))

    return NextResponse.json(recentOptimizations)

  } catch (error) {
    console.error('Dashboard optimizations API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}