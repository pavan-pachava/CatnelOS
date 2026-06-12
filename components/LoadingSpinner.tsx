'use client'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        <div className="h-8 bg-slate-700 rounded mt-4"></div>
      </div>
    </div>
  )
}
