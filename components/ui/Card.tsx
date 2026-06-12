'use client'

interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export function Card({ children, className = '', href, onClick }: CardProps) {
  const baseClass = 'bg-slate-800 rounded-xl p-6 border border-slate-700 transition-all duration-200'
  const interactiveClass = href || onClick ? 'hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900' : ''

  if (href) {
    return (
      <a href={href} className={`${baseClass} ${interactiveClass} ${className} block`}>
        {children}
      </a>
    )
  }

  return (
    <div className={`${baseClass} ${interactiveClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
