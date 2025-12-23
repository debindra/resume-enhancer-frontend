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

    // Get user's tier info
    const tierInfo = await getTierInfo(supabase, userId)

    return NextResponse.json(tierInfo)

  } catch (error) {
    console.error('Billing tier info API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getTierInfo(supabase: any, userId: string) {
  // Get user's current tier
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('tier')
    .eq('user_id', userId)
    .single()

  const tier = userProfile?.tier || 'freemium'

  // Tier information matching Python backend
  const tierInfo = {
    freemium: {
      name: "Freemium",
      price: 0,
      credits: 3,
      features: [
        "3 resume optimizations/month",
        "Basic ATS score",
        "PDF export only",
      ],
    },
    plus: {
      name: "Plus",
      price: 19,
      credits: 15,
      features: [
        "15 credits/month",
        "Enhanced ATS insights",
        "Unlimited cover letter drafts",
        "Resume history (last 10 versions)",
        "Email support",
      ],
    },
    pro: {
      name: "Pro",
      price: 49,
      credits: 50,
      features: [
        "50 credits/month",
        "Advanced ATS scoring",
        "LinkedIn profile enhancement",
        "Recruiter share links",
        "Priority support",
        "Unlimited resume history",
        "All export formats",
      ],
    },
    recruiter: {
      name: "Recruiter",
      price: 199,
      credits: 200,
      features: [
        "200 pooled credits/month",
        "5 recruiter seats",
        "API access",
        "Analytics dashboard",
        "Bulk candidate review",
        "White-label options",
        "Dedicated support",
      ],
    },
  }

  return tierInfo[tier as keyof typeof tierInfo] || tierInfo.freemium
}