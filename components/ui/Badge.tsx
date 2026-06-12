'use client'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    success: 'bg-green-900 text-green-200',
    warning: 'bg-yellow-900 text-yellow-200',
    info: 'bg-blue-900 text-blue-200',
  }

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  )
}
