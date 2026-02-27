'use client'

import { cn } from '@/lib/utils'
import type { Notification } from '@/types/curricula'

interface NotificationBannerProps {
  notification: Notification
  onClose: () => void
}

export function NotificationBanner({ notification, onClose }: NotificationBannerProps) {
  if (!notification.show) return null

  const isSuccess = notification.type === 'success'

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm w-full',
        'rounded-lg shadow-xl border p-4',
        'transition-all duration-300',
        isSuccess
          ? 'bg-must-green/10 border-must-green text-must-green-darker'
          : 'bg-red-50 border-red-400 text-red-700'
      )}
    >
      <div className="flex items-center gap-3">
        <i
          className={cn(
            'fas text-base',
            isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'
          )}
          aria-hidden="true"
        />
        <span className="flex-1 text-sm font-medium">{notification.message}</span>
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded hover:bg-black/10 transition-colors"
          aria-label="Close notification"
        >
          <i className="fas fa-times text-sm" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}