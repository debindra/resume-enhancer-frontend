import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '../../_lib/supabase-server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()

    // Try to authenticate using Bearer token first (helps when cookies are not wired correctly)
    const authHeader = request.headers.get('authorization')
    let userId: string | null = null
    let accessToken: string | null = null

    if (authHeader?.startsWith('Bearer ')) {
      accessToken = authHeader.slice(7)
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(accessToken)

      if (userError) {
        console.error('Error verifying access token in billing checkout route:', userError)
      }

      if (user) {
        userId = user.id
      }
    }

    // Fallback to session from cookies if no valid Bearer token
    if (!userId) {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error('Error getting session in billing checkout route:', sessionError)
      }

      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }

      userId = session.user.id
      accessToken = session.access_token
    }

    const body = await request.json()
    const { price_id } = body

    if (!price_id) {
      return NextResponse.json(
        { error: 'price_id is required' },
        { status: 400 }
      )
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Call backend API
    const response = await fetch(`${BACKEND_URL}/api/v1/billing/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ price_id }),
    })

    if (!response.ok) {
      let message = 'Failed to create checkout session'
      try {
        const text = await response.text()
        try {
          const errorJson = JSON.parse(text)
          message = errorJson.detail || errorJson.error || message
        } catch {
          // HTML or plain text error page from backend
          if (text && !text.startsWith('<!DOCTYPE')) {
            message = text
          }
        }
      } catch (readErr) {
        console.error('Error reading backend checkout error response:', readErr)
      }

      return NextResponse.json(
        { error: message },
        { status: response.status }
      )
    }

    // Successful response should be JSON from backend
    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

