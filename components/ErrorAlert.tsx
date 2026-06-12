'use client'

interface ErrorAlertProps {
  title?: string
  message: string
}

export function ErrorAlert({ title = 'Error', message }: ErrorAlertProps) {
  return (
    <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
      <h3 className="text-red-300 font-semibold mb-1">{title}</h3>
      <p className="text-red-200 text-sm">{message}</p>
    </div>
  )
}
