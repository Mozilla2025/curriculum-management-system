'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TrackingNotification } from '@/types/tracking'

interface Props { notification: TrackingNotification; onClose: () => void }

export function TrackingNotificationBanner({ notification, onClose }: Props) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (!notification.show) return
    setProgress(100)
    const interval = setInterval(() => setProgress((p) => Math.max(0, p - 2.5)), 100)
    return () => clearInterval(interval)
  }, [notification.show, notification.message])

  if (!notification.show) return null

  const config = {
    success: { bar: 'bg-must-green',    icon: 'fas fa-check-circle',       text: 'text-must-green-darker', border: 'border-must-green' },
    error:   { bar: 'bg-red-500',       icon: 'fas fa-exclamation-circle', text: 'text-red-700',           border: 'border-red-400'    },
    warning: { bar: 'bg-amber-500',     icon: 'fas fa-exclamation-triangle',text: 'text-amber-700',        border: 'border-amber-400'  },
    info:    { bar: 'bg-must-blue',     icon: 'fas fa-info-circle',        text: 'text-must-blue',         border: 'border-must-blue'  },
  }[notification.type]

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'fixed top-4 right-4 z-50 w-full max-w-sm rounded-xl shadow-strong border bg-white overflow-hidden',
        'animate-slide-in-right',
        config.border,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <i className={cn(config.icon, config.text, 'text-base flex-shrink-0')} aria-hidden="true" />
        <span className="flex-1 text-sm font-medium text-gray-800">{notification.message}</span>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close notification"
        >
          <i className="fas fa-times text-sm" aria-hidden="true" />
        </button>
      </div>
      <div className="h-1 bg-gray-100">
        <div
          className={cn('h-full transition-all duration-100', config.bar)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
