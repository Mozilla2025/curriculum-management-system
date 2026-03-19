'use client'

import { cn } from '@/lib/utils'
import type { Notification } from '@/types/notifications'
import { NotificationItem } from './NotificationItem'

interface NotificationsListProps {
  notifications: Notification[]
  isLoading: boolean
  selectedIds: Set<number>
  onSelectAll: () => void
  onDeleteSelected: () => void
  onToggleSelect: (id: number) => void
  onAction: (action: string, id: number) => void
  onToggleRead: (id: number) => void
}

function LoadingSkeleton() {
  return (
    <div className="p-16 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-must-green rounded-full animate-spin" />
      <p className="text-sm text-gray-500 font-medium">Loading notifications...</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-6">
      <i className="fas fa-bell-slash text-4xl text-gray-300 mb-4 block" aria-hidden="true" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications found</h3>
      <p className="text-sm text-gray-500">
        You&apos;re all caught up! No notifications match your current filters.
      </p>
    </div>
  )
}

export function NotificationsList({
  notifications,
  isLoading,
  selectedIds,
  onSelectAll,
  onDeleteSelected,
  onToggleSelect,
  onAction,
  onToggleRead,
}: NotificationsListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-gray-200 bg-gray-50/80">
        <h2 className="text-base font-semibold text-gray-900">Recent Notifications</h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onSelectAll}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold',
              'bg-white border border-gray-200 text-gray-600',
              'hover:border-must-green hover:text-must-green transition-colors'
            )}
          >
            <i className="fas fa-check-square" aria-hidden="true" />
            Select All
          </button>

          <button
            onClick={onDeleteSelected}
            disabled={selectedIds.size === 0}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold',
              'bg-white border border-gray-200 text-gray-600',
              'hover:border-red-400 hover:text-red-500 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <i className="fas fa-trash" aria-hidden="true" />
            Delete Selected
            {selectedIds.size > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                {selectedIds.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* List body */}
      <div
        className="max-h-[70vh] overflow-y-auto"
        role="list"
        aria-label="Notifications list"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <LoadingSkeleton />
        ) : notifications.length === 0 ? (
          <EmptyState />
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              isSelected={selectedIds.has(notification.id)}
              onToggleSelect={onToggleSelect}
              onAction={onAction}
              onToggleRead={onToggleRead}
            />
          ))
        )}
      </div>
    </div>
  )
}
