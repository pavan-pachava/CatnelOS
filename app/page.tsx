'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard/daily')
    } else {
      router.push('/auth/register')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur z-50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            <span className="text-xl font-bold text-white">PulseOS</span>
          </Link>
          <Button onClick={handleGetStarted} variant="primary">
            {session ? '📊 Dashboard' : '🚀 Get Started'}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <p className="text-purple-400 font-semibold">Personal Operating System</p>
            <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
              Your life as a <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">living data OS</span>
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Click any section to explore features. Connect your Spotify, GitHub, Calendar, and more to unlock personalized insights about your patterns, productivity, and wellbeing.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="mx-auto">
            Explore Now
          </Button>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Data Integrations */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <span>🔌</span> Data Integrations
            </h2>
            <Badge className="mb-6">core</Badge>
            <p className="text-slate-400 mb-6">What PulseOS plugs into</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <span className="text-3xl block mb-2">🎵</span>
                <h3 className="font-bold text-white mb-2">Spotify</h3>
                <p className="text-sm text-slate-300">Listening history, BPM, energy, valence, top tracks</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">💻</span>
                <h3 className="font-bold text-white mb-2">GitHub</h3>
                <p className="text-sm text-slate-300">Commits, PRs, code reviews, languages, streaks</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">📅</span>
                <h3 className="font-bold text-white mb-2">Google Calendar</h3>
                <p className="text-sm text-slate-300">Meeting load, free time, scheduling patterns</p>
              </Card>
            </div>
          </div>

          {/* Daily Dashboard */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <span>📊</span> Daily Dashboard
            </h2>
            <Badge className="mb-6">core</Badge>
            <p className="text-slate-400 mb-6">What you see every morning</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <span className="text-3xl block mb-2">⭐</span>
                <h3 className="font-bold text-white mb-2">Today at a Glance</h3>
                <p className="text-sm text-slate-300">5 key metrics: energy, meetings, streak, coding, mood</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">🤖</span>
                <h3 className="font-bold text-white mb-2">Morning Briefing</h3>
                <p className="text-sm text-slate-300">AI-generated 3-line summary of your patterns</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">🎯</span>
                <h3 className="font-bold text-white mb-2">Focus Score</h3>
                <p className="text-sm text-slate-300">Daily 0-100 score combining work & balance</p>
              </Card>
            </div>
          </div>

          {/* Correlation Insights */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <span>✨</span> Correlation Insights
            </h2>
            <Badge className="mb-6">ML depth</Badge>
            <p className="text-slate-400 mb-6">The meaningful ML — patterns across your data</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <span className="text-3xl block mb-2">🎵</span>
                <h3 className="font-bold text-white mb-2">Music → Productivity</h3>
                <p className="text-sm text-slate-300">Which genres & BPM coincide with best work</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">🌤️</span>
                <h3 className="font-bold text-white mb-2">Weather → Mood</h3>
                <p className="text-sm text-slate-300">Rain effects, temperature correlations</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">📈</span>
                <h3 className="font-bold text-white mb-2">Meeting Load → Quality</h3>
                <p className="text-sm text-slate-300">Meetings predict code quality & bug ratios</p>
              </Card>
            </div>
          </div>

          {/* Deep Analytics */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <span>📈</span> Deep Analytics
            </h2>
            <Badge className="mb-6">analytics</Badge>
            <p className="text-slate-400 mb-6">Charts and breakdowns for the data-curious</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <span className="text-3xl block mb-2">🎵</span>
                <h3 className="font-bold text-white mb-2">Listening Timeline</h3>
                <p className="text-sm text-slate-300">Full history filterable by mood & genre</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">💻</span>
                <h3 className="font-bold text-white mb-2">Coding Timeline</h3>
                <p className="text-sm text-slate-300">Commits, languages, most productive repos</p>
              </Card>
              <Card>
                <span className="text-3xl block mb-2">📊</span>
                <h3 className="font-bold text-white mb-2">Custom Metrics</h3>
                <p className="text-sm text-slate-300">Build your own formulas from any data</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Preview */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
            <span>⚙️</span> Technical Architecture
          </h2>
          <Badge className="mb-6">infra</Badge>
          <p className="text-slate-400 mb-6">What you actually need to build</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <h3 className="font-bold text-white mb-2">Next.js</h3>
              <p className="text-sm text-slate-300">Server components, API routes, OAuth callbacks</p>
            </Card>
            <Card>
              <h3 className="font-bold text-white mb-2">PostgreSQL + TimescaleDB</h3>
              <p className="text-sm text-slate-300">Time-series database for efficient event storage</p>
            </Card>
            <Card>
              <h3 className="font-bold text-white mb-2">FastAPI ML Service</h3>
              <p className="text-sm text-slate-300">Python microservice for correlation & anomaly detection</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to meet your data?</h2>
          <p className="text-slate-400 mb-6">
            Connect your integrations and start seeing patterns in your life.
          </p>
          <Button onClick={handleGetStarted} size="lg">
            {session ? 'Go to Dashboard' : 'Get Started Now'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center text-slate-400 text-sm">
          <p>PulseOS — Your life as a living data OS</p>
        </div>
      </footer>
    </div>
  )
}
