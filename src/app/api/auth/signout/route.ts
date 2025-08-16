import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ 
      message: 'Sign out successful'
    })
    
    // Clear authentication cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    })
    
    return response
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { message: 'Sign out failed' },
      { status: 500 }
    )
  }
}