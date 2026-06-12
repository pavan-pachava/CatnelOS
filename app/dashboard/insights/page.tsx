'use client'

import { InsightCard } from '@/components/InsightCard'
import { mockCorrelationInsights } from '@/lib/mockData'

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Correlation Insights</h1>
        <p className="text-slate-400">The meaningful ML — patterns across your data</p>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCorrelationInsights.map((insight) => (
          <InsightCard
            key={insight.id}
            title={insight.title}
            description={insight.description}
            badge={insight.badge}
            icon={insight.icon}
            correlation={insight.correlation}
          />
        ))}
      </div>

      {/* Key Insights */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">This Week's Key Insights</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <p className="font-semibold text-white">Synth & Electronic genres boost productivity by 34%</p>
              <p className="text-sm text-slate-400">Your best 3-hour deep work blocks correlate with Lo-Fi and Synthwave tracks (120-140 BPM)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">🌧️</span>
            <div>
              <p className="font-semibold text-white">Rain increases commit frequency</p>
              <p className="text-sm text-slate-400">Rainy days show 22% more commits, possibly due to reduced meeting scheduling</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-semibold text-white">Meeting density predicts code quality</p>
              <p className="text-sm text-slate-400">High meeting days (5+) correlate with 15% shorter commit messages and higher bug-fix ratio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
