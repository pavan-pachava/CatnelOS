'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { href: '/dashboard/daily', label: 'Daily Dashboard', icon: '📊' },
    { href: '/dashboard/integrations', label: 'Integrations', icon: '🔌' },
    { href: '/dashboard/insights', label: 'Insights', icon: '✨' },
    { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 p-6 h-screen flex flex-col">
      <Link href="/dashboard/daily" className="mb-8 flex items-center gap-2">
        <span className="text-3xl">⚡</span>
        <span className="text-xl font-bold text-white">PulseOS</span>
      </Link>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-all block ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {session?.user && (
        <div className="border-t border-slate-700 pt-4">
          <p className="text-sm text-slate-400 mb-3">Logged in as:</p>
          <p className="text-white font-semibold text-sm mb-3 truncate">
            {session.user.email}
          </p>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="w-full px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition-all"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </aside>
  )
}
