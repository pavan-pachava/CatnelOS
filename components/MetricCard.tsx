'use client'

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  change?: { value: number; trend: 'up' | 'down' }
  icon?: string
}

export function MetricCard({ title, value, unit, change, icon }: MetricCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">
            {value}
            {unit && <span className="text-lg text-slate-400 ml-1">{unit}</span>}
          </p>
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
      {change && (
        <div className={`mt-3 text-sm ${change.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {change.trend === 'up' ? '↑' : '↓'} {change.value}%
        </div>
      )}
    </div>
  )
}
