import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getUserIntegrations } from '@/lib/auth-service'
import { buildSpotifyAuthUrl, getSpotifyRecentlyPlayed } from '@/lib/spotify-api'

export async function GET() {
  try {
    const session = await getSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const integrations = await getUserIntegrations(session.user.id)
    
    // Add real-time track count if spotify is connected
    const enrichedIntegrations = await Promise.all(integrations.map(async (integration: any) => {
      if (integration.provider === 'spotify') {
        try {
          const recent = await getSpotifyRecentlyPlayed(session.user.id, 50)
          const today = new Date().setHours(0, 0, 0, 0)
          const tracksToday = recent.filter((item: any) => new Date(item.played_at).getTime() > today).length
          return { ...integration, tracks_today: tracksToday }
        } catch (e) {
          console.error('Failed to fetch spotify metrics for integration list:', e)
          return integration
        }
      }
      return integration
    }))

    return NextResponse.json({
      integrations: enrichedIntegrations.map((integration: any) => ({
        id: integration.id,
        provider: integration.provider,
        connected_at: integration.connected_at,
        updated_at: integration.updated_at,
        expires_at: integration.expires_at,
        tracks_today: integration.tracks_today,
      })),
    })
  } catch (error) {
    console.error('Get integrations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { provider } = body

    if (provider === 'spotify') {
      const authUrl = buildSpotifyAuthUrl()
      return NextResponse.json({ auth_url: authUrl })
    }

    return NextResponse.json(
      { error: 'Unsupported provider' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Create integration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
