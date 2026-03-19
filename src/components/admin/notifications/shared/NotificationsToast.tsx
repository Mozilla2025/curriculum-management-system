'use client'

import { cn } from '@/lib/utils'
import type { NotificationToast } from '@/types/notifications'

interface NotificationsToastProps {
  toasts: NotificationToast[]
  onDismiss: (id: number) => void
}

const TOAST_STYLES: Record<
  NotificationToast['type'],
  { container: string; icon: string; iconClass: string }
> = {
  success: {
    container: 'border-l-4 border-l-must-green',
    icon:      'fa-check-circle',
    iconClass: 'text-must-green',
  },
  error: {
    container: 'border-l-4 border-l-red-500',
    icon:      'fa-exclamation-circle',
    iconClass: 'text-red-500',
  },
  info: {
    container: 'border-l-4 border-l-must-blue',
    icon:      'fa-info-circle',
    iconClass: 'text-must-blue',
  },
}

export function NotificationsToast({ toasts, onDismiss }: NotificationsToastProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full"
      role="region"
      aria-label="Toast notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const styles = TOAST_STYLES[toast.type]
        return (
          <div
            key={toast.id}
            role="alert"
            className={cn(
              'bg-white rounded-lg shadow-xl px-4 py-3',
              'flex items-center gap-3 animate-slide-in-right',
              styles.container
            )}
          >
            <i
              className={cn('fas flex-shrink-0 text-lg', styles.icon, styles.iconClass)}
              aria-hidden="true"
            />
            <span className="flex-1 text-sm font-medium text-gray-700">{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="flex-shrink-0 p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Dismiss notification"
            >
              <i className="fas fa-times text-sm" aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
