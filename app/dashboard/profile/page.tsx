'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner, LoadingCard } from '@/components/LoadingSpinner'
import { ErrorAlert } from '@/components/ErrorAlert'
import { mockUser, mockIntegrations } from '@/lib/mockData'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface Integration {
  id: string
  provider: string
  connected_at: string
  updated_at: string
  expires_at: string
}

interface User {
  id: string
  email: string
  name: string
  avatar_url: string
  created_at: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, intRes] = await Promise.all([
          fetch('/api/users/me'),
          fetch('/api/integrations'),
        ])

        if (!userRes.ok) throw new Error('Failed to fetch user')
        if (!intRes.ok) throw new Error('Failed to fetch integrations')

        const userData = await userRes.json()
        const intData = await intRes.json()

        setUser(userData)
        setIntegrations(intData.integrations)
      } catch (err) {
        console.error('Error fetching profile data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Loading...</p>
        </div>
        <LoadingCard />
      </div>
    )
  }

  const connectedIntegrations = mockIntegrations.filter(i =>
    integrations.some(int => int.provider === i.id)
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
        <p className="text-slate-400">Your PulseOS account settings and data</p>
      </div>

      {error && <ErrorAlert message={error} />}

      {/* User Info */}
      <Card>
        <div className="flex items-start gap-6">
          <span className="text-6xl">👤</span>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-1">
              {user?.name || session?.user?.email || 'User'}
            </h2>
            <p className="text-slate-400 mb-2">{session?.user?.email}</p>
            <p className="text-slate-400 text-sm mb-4">Member since {mockUser.joined}</p>
            <p className="text-slate-300">{mockUser.bio}</p>
          </div>
        </div>
      </Card>

      {/* Connected Integrations */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Connected Integrations</h2>
        {integrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrations.map((integration) => {
              const mockInt = mockIntegrations.find(i => i.id === integration.provider)
              return (
                <Card key={integration.id} className="text-center">
                  <span className="text-4xl block mb-2">{mockInt?.icon || '🔌'}</span>
                  <h3 className="font-bold text-white">{mockInt?.name || integration.provider}</h3>
                  <p className="text-xs text-slate-400 mt-2">Last synced 2 hours ago</p>
                  <Badge className="mt-3">{mockInt?.badge}</Badge>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <p className="text-slate-400 text-center py-6">No integrations connected yet</p>
          </Card>
        )}
      </section>

      {/* Data & Privacy */}
      <Card>
        <h3 className="text-lg font-bold text-white mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="font-semibold text-white mb-2">Export Your Data</p>
            <p className="text-sm text-slate-400 mb-3">Download all your PulseOS data in JSON format</p>
            <Button variant="secondary" size="sm">
              📥 Export Data
            </Button>
          </div>

          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="font-semibold text-white mb-2">Data Retention</p>
            <p className="text-sm text-slate-400 mb-3">
              Your data is automatically deleted after 3 years of inactivity. You can request immediate deletion at any time.
            </p>
            <Button variant="secondary" size="sm">
              🗑️ Request Deletion
            </Button>
          </div>

          <div className="p-4 bg-slate-700/50 rounded-lg">
            <p className="font-semibold text-white mb-2">Privacy Settings</p>
            <p className="text-sm text-slate-400 mb-3">
              Control who can see your insights. Your data is never sold.
            </p>
            <Button variant="secondary" size="sm">
              ⚙️ Manage Privacy
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card>
        <h3 className="text-lg font-bold text-white mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <span className="text-slate-300">Email Notifications</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <span className="text-slate-300">Weekly Digest</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <span className="text-slate-300">Anomaly Alerts</span>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </Card>
    </div>
  )
}
