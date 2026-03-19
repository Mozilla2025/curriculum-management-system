'use client'

import { cn } from '@/lib/utils'
import type { UserNotification } from '@/types/user-management'

interface NotificationProps {
  notification: UserNotification
  onClose: () => void
}

export function UserManagementNotification({ notification, onClose }: NotificationProps) {
  if (!notification.show) return null

  const isSuccess = notification.type === 'success'
  const isError = notification.type === 'error'

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'fixed top-24 right-4 z-50 max-w-sm w-full rounded-lg shadow-xl overflow-hidden',
        'transform transition-transform duration-300',
        'border-l-4',
        isSuccess && 'bg-white border-must-green',
        isError && 'bg-white border-red-500',
        !isSuccess && !isError && 'bg-white border-blue-500'
      )}
    >
      <div className="flex items-center gap-3 p-4">
        <i
          className={cn(
            'fas text-lg flex-shrink-0',
            isSuccess && 'fa-check-circle text-must-green',
            isError && 'fa-exclamation-circle text-red-500',
            !isSuccess && !isError && 'fa-info-circle text-blue-500'
          )}
          aria-hidden="true"
        />
        <span className="flex-1 text-sm font-medium text-gray-800">
          {notification.message}
        </span>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
          aria-label="Close notification"
        >
          <i className="fas fa-times text-sm" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
