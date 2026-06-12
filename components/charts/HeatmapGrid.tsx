'use client'

interface HeatmapGridProps {
  data: { day: string; score: number; label: string }[]
}

export function HeatmapGrid({ data }: HeatmapGridProps) {
  const getColor = (score: number) => {
    if (score >= 85) return 'bg-green-800'
    if (score >= 70) return 'bg-green-700'
    if (score >= 50) return 'bg-yellow-700'
    if (score >= 30) return 'bg-orange-700'
    return 'bg-red-800'
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-2">
            <div
              className={`w-12 h-12 rounded-lg ${getColor(item.score)} flex items-center justify-center font-bold text-white transition-transform hover:scale-110`}
              title={`${item.day}: ${item.score} (${item.label})`}
            >
              {item.score}
            </div>
            <span className="text-xs text-slate-400">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-800 rounded"></div> &lt; 30
        </span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-orange-700 rounded"></div> 30-50
        </span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-700 rounded"></div> 50-70
        </span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-700 rounded"></div> 70-85
        </span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-800 rounded"></div> 85+
        </span>
      </div>
    </div>
  )
}
