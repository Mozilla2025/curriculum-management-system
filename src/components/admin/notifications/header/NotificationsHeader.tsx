'use client'

import { cn } from '@/lib/utils'

interface NotificationsHeaderProps {
  onMarkAllRead: () => void
  onRefresh: () => void
  onSettings: () => void
}

export function NotificationsHeader({
  onMarkAllRead,
  onRefresh,
  onSettings,
}: NotificationsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <i className="fas fa-bell text-must-green" aria-hidden="true" />
            Notifications Center
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all system notifications, alerts, and reminders
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={onMarkAllRead}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold',
              'bg-gradient-to-r from-must-green via-must-green-dark to-must-teal text-white shadow-sm',
              'hover:-translate-y-px hover:shadow-md transition-all duration-300'
            )}
          >
            <i className="fas fa-check-double" aria-hidden="true" />
            Mark All Read
          </button>

          <button
            onClick={onSettings}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold',
              'bg-gradient-to-r from-must-blue to-must-blue-dark text-white shadow-sm',
              'hover:-translate-y-px hover:shadow-md transition-all duration-300'
            )}
          >
            <i className="fas fa-cog" aria-hidden="true" />
            Settings
          </button>

          <button
            onClick={onRefresh}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold',
              'bg-white border-2 border-gray-200 text-gray-600',
              'hover:border-must-green hover:text-must-green transition-all duration-300'
            )}
          >
            <i className="fas fa-sync-alt" aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}
