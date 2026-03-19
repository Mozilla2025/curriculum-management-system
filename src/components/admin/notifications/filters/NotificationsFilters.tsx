'use client'

import { cn } from '@/lib/utils'
import type { NotificationFilters } from '@/types/notifications'

interface NotificationsFiltersProps {
  filters: NotificationFilters
  onFilterChange: <K extends keyof NotificationFilters>(key: K, value: NotificationFilters[K]) => void
  onClearFilters: () => void
}

const selectCls = cn(
  'w-full px-3 py-2.5 text-sm font-medium text-gray-600 bg-white',
  'border-2 border-gray-200 rounded-lg appearance-none cursor-pointer',
  'transition-all duration-200 hover:border-must-green',
  'focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10'
)

export function NotificationsFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: NotificationsFiltersProps) {
  const hasActiveFilters =
    !!filters.search || !!filters.type || !!filters.priority || !!filters.status

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 shadow-soft mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px]">
          <i
            className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            className={cn(
              'w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg bg-white',
              'text-sm text-gray-800 placeholder:text-gray-400',
              'transition-all duration-300 focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10'
            )}
            placeholder="Search notifications..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            aria-label="Search notifications"
          />
        </div>

        {/* Type */}
        <div className="min-w-[140px]">
          <select
            className={selectCls}
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            aria-label="Filter by type"
          >
            <option value="">All Types</option>
            <option value="system">System</option>
            <option value="workflow">Workflow</option>
            <option value="reminder">Reminder</option>
            <option value="alert">Alert</option>
          </select>
        </div>

        {/* Priority */}
        <div className="min-w-[140px]">
          <select
            className={selectCls}
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Status */}
        <div className="min-w-[140px]">
          <select
            className={selectCls}
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg',
              'text-xs font-medium text-red-600 border border-red-200',
              'hover:bg-red-50 transition-colors'
            )}
          >
            <i className="fas fa-times" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
