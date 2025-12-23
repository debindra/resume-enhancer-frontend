import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'
const TIMEOUT_MS = 30000 // 30 seconds for file extraction

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const url = `${BACKEND_URL}/api/v1/analyzer/extract`
    
    // Create an AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
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
          { error: 'Request timeout - file extraction is taking too long.' },
          { status: 504 }
        )
      }
      
      throw fetchError
    }
  } catch (error: any) {
    console.error('Extract proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

