'use client'

import { cn } from '@/lib/utils'
import type { Notification } from '@/types/notifications'

interface NotificationItemProps {
  notification: Notification
  isSelected: boolean
  onToggleSelect: (id: number) => void
  onAction: (action: string, id: number) => void
  onToggleRead: (id: number) => void
}

const TYPE_ICON: Record<Notification['type'], string> = {
  system:   'fa-server',
  workflow: 'fa-tasks',
  reminder: 'fa-clock',
  alert:    'fa-exclamation-triangle',
}

const TYPE_ICON_BG: Record<Notification['type'], string> = {
  system:   'from-must-green via-must-green-dark to-must-teal',
  workflow: 'from-must-blue to-must-blue-dark',
  reminder: 'from-must-gold to-amber-600',
  alert:    'from-red-500 to-red-600',
}

const TYPE_BADGE: Record<Notification['type'], string> = {
  system:   'bg-must-green/10 text-must-green-darker',
  workflow: 'bg-must-blue/10 text-must-blue',
  reminder: 'bg-must-gold/10 text-amber-700',
  alert:    'bg-red-50 text-red-600',
}

const PRIORITY_BADGE: Record<Notification['priority'], string> = {
  high:   'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-700',
  low:    'bg-gray-100 text-gray-600',
}

export function NotificationItem({
  notification,
  isSelected,
  onToggleSelect,
  onAction,
  onToggleRead,
}: NotificationItemProps) {
  const { id, type, priority, title, message, time, unread, urgent, actions } = notification

  return (
    <article
      className={cn(
        'flex gap-4 p-5 border-b border-gray-100 transition-colors',
        'hover:bg-must-green/[0.02]',
        unread && !urgent && 'bg-must-blue/[0.02] border-l-4 border-l-must-blue',
        urgent &&  'border-l-4 border-l-red-500'
      )}
      aria-label={`${unread ? 'Unread notification' : 'Notification'}: ${title}`}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 pt-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(id)}
          className="w-4 h-4 rounded border-gray-300 text-must-green accent-must-green cursor-pointer focus:ring-must-green"
          aria-label={`Select notification: ${title}`}
        />
      </div>

      {/* Type Icon */}
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white mt-0.5 shadow-sm',
          'bg-gradient-to-br',
          TYPE_ICON_BG[type]
        )}
        aria-hidden="true"
      >
        <i className={`fas ${TYPE_ICON[type]} text-sm`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title + Time */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1.5">
          <h4 className="text-sm font-semibold text-gray-900 leading-snug">{title}</h4>
          <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{time}</span>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{message}</p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              TYPE_BADGE[type]
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          <span
            className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              PRIORITY_BADGE[priority]
            )}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </span>
          {urgent && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
              Urgent
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          {actions.map((action, i) => (
            <button
              key={action}
              onClick={() => onAction(action, id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200',
                i === 0
                  ? 'bg-must-green text-white border-must-green hover:bg-must-green-dark'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-must-green hover:text-must-green'
              )}
            >
              {action}
            </button>
          ))}
          <button
            onClick={() => onToggleRead(id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-white text-gray-600 border-gray-200 hover:border-must-green hover:text-must-green transition-all duration-200"
          >
            {unread ? 'Mark as Read' : 'Mark as Unread'}
          </button>
        </div>
      </div>
    </article>
  )
}
