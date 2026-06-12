'use client'

import { Card } from '@/components/ui/Card'
import { MetricCard } from '@/components/MetricCard'
import { HeatmapGrid } from '@/components/charts/HeatmapGrid'
import { Badge } from '@/components/ui/Badge'
import { LoadingSpinner, LoadingCard } from '@/components/LoadingSpinner'
import { ErrorAlert } from '@/components/ErrorAlert'
import { useEffect, useState } from 'react'
import { mockDailyMetrics } from '@/lib/mockData'

interface Metrics {
  today_at_glance: Array<{ label: string; value: number | string; unit: string }>
  focus_score: number
  live_now: {
    spotify_connected: boolean
  }
}

export default function DailyDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('/api/dashboard/metrics')
        if (!res.ok) throw new Error('Failed to fetch metrics')
        const data = await res.json()
        setMetrics(data)
      } catch (err) {
        console.error('Error fetching metrics:', err)
        setError(err instanceof Error ? err.message : 'Failed to load metrics')
        setMetrics(mockDailyMetrics as any)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  useEffect(() => {
    if (!metrics?.live_now?.spotify_connected) return

    async function fetchCurrentlyPlaying() {
      try {
        const res = await fetch('/api/data/spotify/current-playing')
        if (res.ok) {
          const data = await res.json()
          setCurrentlyPlaying(data)
        }
      } catch (err) {
        console.error('Error fetching current track:', err)
      }
    }

    fetchCurrentlyPlaying()
    const interval = setInterval(fetchCurrentlyPlaying, 10000) // Poll every 10s
    return () => clearInterval(interval)
  }, [metrics?.live_now.spotify_connected])

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Daily Dashboard</h1>
          <p className="text-slate-400">Loading...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Daily Dashboard</h1>
          <ErrorAlert message="Unable to load metrics" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Daily Dashboard</h1>
        <p className="text-slate-400">What you see every morning</p>
      </div>

      {error && <ErrorAlert message={error} />}

      {/* Today at a Glance */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Today at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {metrics.today_at_glance.map((metric, idx) => (
            <MetricCard
              key={idx}
              title={metric.label}
              value={metric.value}
              unit={metric.unit}
            />
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Morning Briefing */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-2">Morning Briefing</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            {(mockDailyMetrics as any).morning_briefing}
          </p>
          <Badge variant="info">AI</Badge>
        </Card>

        {/* Live Now Widget */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-4">Live Now</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Currently Playing</p>
              {currentlyPlaying?.is_playing ? (
                <div className="flex items-center gap-3 mt-1">
                  {currentlyPlaying.item?.album?.images[0]?.url && (
                    <img src={currentlyPlaying.item.album.images[0].url} alt="Album" className="w-8 h-8 rounded shadow-lg animate-pulse" />
                  )}
                  <div>
                    <p className="text-white font-semibold truncate max-w-[150px]">{currentlyPlaying.item?.name}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[150px]">{currentlyPlaying.item?.artists?.map((a: any) => a.name).join(', ')}</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic mt-1">Nothing playing</p>
              )}
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Status</p>
              <p className={`font-semibold ${currentlyPlaying?.is_playing ? 'text-green-400' : 'text-slate-400'}`}>
                {currentlyPlaying?.is_playing ? '🎵 Listening' : '💤 Idle'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Next Meeting</p>
              <p className="text-white font-semibold">{(mockDailyMetrics as any).live_now.next_meeting}</p>
              <p className="text-xs text-slate-400 mt-1">{(mockDailyMetrics as any).live_now.time_until}</p>
            </div>
          </div>
          <Badge className="mt-4" variant="success">real-time</Badge>
        </Card>

        {/* Focus Score */}
        <Card className="lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-4">Focus Score</h3>
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text">
              {typeof metrics.focus_score === 'number' ? metrics.focus_score : metrics.focus_score.score}
            </p>
            <p className="text-xs text-slate-400 mt-1">out of 100</p>
          </div>
          <div className="space-y-2 text-sm">
            {(typeof metrics.focus_score === 'number' ? (mockDailyMetrics as any).focus_score.components : metrics.focus_score.components).map((comp: any, idx: number) => (
              <div key={idx} className="flex justify-between text-slate-300">
                <span>{comp.label}</span>
                <span className="font-semibold text-white">{comp.value}%</span>
              </div>
            ))}
          </div>
          <Badge className="mt-4" variant="default">ML</Badge>
        </Card>
      </div>

      {/* Streaks */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Streak Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(mockDailyMetrics as any).streaks.map((streak: any, idx: number) => (
            <Card key={idx}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white">{streak.icon} {streak.name}</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Current</p>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full transition-all"
                      style={{ width: `${(streak.current / streak.best) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-bold text-white mt-1">{streak.current} days</p>
                </div>
                <p className="text-xs text-slate-400">Best: {streak.best} days</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Week Heatmap */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Week Heatmap</h2>
        <Card>
          <HeatmapGrid data={(mockDailyMetrics as any).week_heatmap} />
          <Badge className="mt-4" variant="default">visual</Badge>
        </Card>
      </section>
    </div>
  )
}
