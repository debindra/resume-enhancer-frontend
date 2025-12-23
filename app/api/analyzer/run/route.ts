import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'
const TIMEOUT_MS = 120000 // 2 minutes timeout for long-running LLM requests

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const url = `${BACKEND_URL}/api/v1/analyzer/run`
    
    // Create an AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Forward authorization header if present
          ...(request.headers.get('authorization') && {
            'Authorization': request.headers.get('authorization')!
          }),
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
      
      const data = await response.json()
      return NextResponse.json(data)
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout - the analysis is taking too long. Please try again.' },
          { status: 504 }
        )
      }
      
      // Handle connection errors
      const errorMessage = fetchError.message || String(fetchError)
      if (errorMessage.includes('socket hang up') || errorMessage.includes('ECONNRESET') || errorMessage.includes('fetch failed')) {
        return NextResponse.json(
          { error: 'Connection to backend was reset. The backend may be processing your request. Please try again in a moment.' },
          { status: 503 }
        )
      }
      
      throw fetchError
    }
  } catch (error: any) {
    console.error('Analyzer proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

