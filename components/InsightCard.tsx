'use client'

import { Badge } from '@/components/ui/Badge'

interface InsightCardProps {
  title: string
  description: string
  badge: string
  icon: string
  correlation?: number
}

export function InsightCard({ title, description, badge, icon, correlation }: InsightCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex items-start gap-4">
        <span className="text-4xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-300 text-sm mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <Badge>{badge}</Badge>
            {correlation !== null && correlation !== undefined && (
              <span className={`text-sm font-semibold ${correlation > 0.5 ? 'text-green-400' : 'text-yellow-400'}`}>
                r = {correlation.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
