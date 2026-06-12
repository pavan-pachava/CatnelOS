import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { exchangeSpotifyCode } from '@/lib/spotify-api'
import { saveSpotifyIntegration } from '@/lib/auth-service'

export async function GET(request: NextRequest) {
  try {
    console.log('Spotify callback started...')
    const session = await auth()
    console.log('Session user ID:', session?.user?.id)

    if (!session?.user?.id) {
      console.error('No session found in Spotify callback')
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      console.error('Spotify error param:', error)
      return NextResponse.redirect(
        new URL(`/dashboard/integrations?error=${error}`, request.url)
      )
    }

    if (!code) {
      console.error('No code found in Spotify callback')
      return NextResponse.redirect(
        new URL('/dashboard/integrations?error=no_code', request.url)
      )
    }

    console.log('Exchanging code for token...')
    const tokenResponse = await exchangeSpotifyCode(code)
    console.log('Token response received')

    const expiresAt = new Date(Date.now() + tokenResponse.expires_in * 1000)
    console.log('Saving integration for user:', session.user.id)
    
    await saveSpotifyIntegration(
      session.user.id,
      tokenResponse.access_token,
      tokenResponse.refresh_token || '',
      expiresAt
    )
    console.log('Integration saved successfully')

    return NextResponse.redirect(
      new URL('/dashboard/integrations?spotify=connected', request.url)
    )
  } catch (error) {
    console.error('Spotify callback exception:', error)
    return NextResponse.redirect(
      new URL('/dashboard/integrations?error=callback_failed', request.url)
    )
  }
}
