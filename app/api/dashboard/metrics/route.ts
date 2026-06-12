import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getSpotifyCurrentlyPlaying, getSpotifyRecentlyPlayed } from '@/lib/spotify-api'
import { getSpotifyIntegration } from '@/lib/auth-service'

export async function GET() {
  try {
    const session = await getSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const spotifyIntegration = await getSpotifyIntegration(userId)
    
    let currentMood = 'Unknown'
    let tracksToday = 0

    if (spotifyIntegration) {
      try {
        const [currentPlaying, recentTracks] = await Promise.all([
          getSpotifyCurrentlyPlaying(userId).catch(e => {
            console.error('Spotify current playing fetch failed:', e)
            return null
          }),
          getSpotifyRecentlyPlayed(userId, 20).catch(e => {
            console.error('Spotify recently played fetch failed:', e)
            return []
          })
        ])

        if (currentPlaying?.item) {
          currentMood = 'Musical'
        }

        if (Array.isArray(recentTracks)) {
          const today = new Date().setHours(0, 0, 0, 0)
          tracksToday = recentTracks.filter((item: any) => 
            item?.played_at && new Date(item.played_at).getTime() > today
          ).length
        }
      } catch (spotifyError) {
        console.error('Spotify data aggregation failed:', spotifyError)
        // Continue with default values if Spotify calls fail
      }
    }

    const metrics = {
      today_at_glance: [
        { label: 'Energy Level', value: 78, unit: '%' },
        { label: 'Meeting Load', value: 5, unit: 'meetings' },
        { label: 'Current Streak', value: 12, unit: 'days' },
        { label: 'Tracks Today', value: tracksToday || '-', unit: 'songs' },
        { label: 'Listening Mood', value: currentMood, unit: 'mood' },
      ],
      focus_score: 76,
      live_now: {
        spotify_connected: !!spotifyIntegration
      }
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Get dashboard metrics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
