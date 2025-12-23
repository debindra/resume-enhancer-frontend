import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'
const TIMEOUT_MS = 10000 // 10 seconds for session deletion

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.text()
    const url = `${BACKEND_URL}/api/v1/analyzer/session`
    
    // Create an AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorText = await response.text()
        return NextResponse.json(
          errorText ? JSON.parse(errorText) : { error: 'Backend request failed' },
          { status: response.status }
        )
      }
      
      // Session deletion returns 204 No Content
      return new NextResponse(null, { status: 204 })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout' },
          { status: 504 }
        )
      }
      
      throw fetchError
    }
  } catch (error: any) {
    console.error('Session deletion proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

