import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '../_lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

interface SaveOptimizationRequest {
  resume_name: string
  job_title: string
  ats_score: number
  original_resume_text?: string
  optimized_resume_text?: string
  job_description?: string
  insights?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const hasBearer = authHeader?.startsWith('Bearer ')

    // Prefer Bearer token if provided (client-side supabase-js session)
    if (hasBearer) {
      const accessToken = authHeader!.slice(7)

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase env vars not set in optimizations route')
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

      if (userError) {
        console.error('Error verifying access token in optimizations route:', userError)
      }

      if (!user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      const userId = user.id
      return await handleSaveOptimization(request, supabase, userId)
    }

    // Fallback: cookie-based session
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
    return await handleSaveOptimization(request, supabase, userId)

  } catch (error) {
    console.error('Optimization API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleSaveOptimization(
  request: NextRequest,
  supabase: any,
  userId: string
) {
  const body: SaveOptimizationRequest = await request.json()

  // Validate required fields
  if (!body.resume_name || !body.job_title || body.ats_score === undefined) {
    return NextResponse.json(
      { error: 'Missing required fields: resume_name, job_title, and ats_score are required' },
      { status: 400 }
    )
  }

  // Truncate long text fields to avoid database limits
  const originalText = body.original_resume_text
    ? body.original_resume_text.substring(0, 10000)
    : null
  const optimizedText = body.optimized_resume_text
    ? body.optimized_resume_text.substring(0, 10000)
    : null
  const jobDesc = body.job_description
    ? body.job_description.substring(0, 5000)
    : null

  // Save optimization to database
  const { data: optimization, error: saveError } = await supabase
    .from('resume_optimizations')
    .insert({
      user_id: userId,
      resume_name: body.resume_name.substring(0, 255),
      job_title: body.job_title.substring(0, 255),
      ats_score: Math.round(body.ats_score * 100) / 100, // Round to 2 decimal places
      original_resume_text: originalText,
      optimized_resume_text: optimizedText,
      job_description: jobDesc,
      insights: body.insights || [],
    })
    .select()
    .single()

  if (saveError) {
    console.error('Error saving optimization:', saveError)
    return NextResponse.json(
      { error: 'Failed to save optimization', details: saveError.message },
      { status: 500 }
    )
  }

  // Ensure user profile exists (create if it doesn't)
  const { error: profileError } = await supabase
    .from('user_profiles')
    .upsert({
      user_id: userId,
      tier: 'freemium',
      credits_remaining: 3,
      credits_total: 3,
    }, {
      onConflict: 'user_id',
      ignoreDuplicates: true
    })

  if (profileError && profileError.code !== '23505') { // Ignore duplicate key errors
    console.error('Error ensuring user profile exists:', profileError)
  }

  return NextResponse.json({
    id: optimization.id,
    message: 'Optimization saved successfully'
  }, { status: 201 })
}


