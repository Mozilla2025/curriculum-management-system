'use client'

import { cn } from '@/lib/utils'
import type { NotificationStats } from '@/types/notifications'

interface StatCardProps {
  title: string
  value: number
  icon: string
  variant: 'unread' | 'urgent' | 'reminders' | 'system'
}

const VARIANT_STYLES: Record<
  StatCardProps['variant'],
  { borderLeft: string; topBar: string; iconBg: string }
> = {
  unread: {
    borderLeft: 'border-l-must-blue',
    topBar:     'from-must-blue to-must-blue-dark',
    iconBg:     'from-must-blue to-must-blue-dark',
  },
  urgent: {
    borderLeft: 'border-l-red-500',
    topBar:     'from-red-500 to-red-600',
    iconBg:     'from-red-500 to-red-600',
  },
  reminders: {
    borderLeft: 'border-l-must-gold',
    topBar:     'from-must-gold to-amber-600',
    iconBg:     'from-must-gold to-amber-600',
  },
  system: {
    borderLeft: 'border-l-must-green',
    topBar:     'from-must-green via-must-green-dark to-must-teal',
    iconBg:     'from-must-green via-must-green-dark to-must-teal',
  },
}

function StatCard({ title, value, icon, variant }: StatCardProps) {
  const styles = VARIANT_STYLES[variant]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border-l-4 bg-gradient-to-br from-white to-gray-50 p-6 shadow-soft',
        'transition-all duration-300 hover:shadow-medium hover:-translate-y-0.5',
        styles.borderLeft
      )}
    >
      {/* Top colour bar */}
      <div
        className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', styles.topBar)}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br',
            styles.iconBg
          )}
        >
          <i className={`fas ${icon} text-sm`} aria-hidden="true" />
        </div>
      </div>

      <p className="text-4xl font-extrabold text-gray-800">{value}</p>
    </div>
  )
}

interface NotificationsStatsGridProps {
  stats: NotificationStats
}

export function NotificationsStatsGrid({ stats }: NotificationsStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard title="Unread"    value={stats.unread}    icon="fa-envelope"             variant="unread"    />
      <StatCard title="Urgent"    value={stats.urgent}    icon="fa-exclamation-triangle"  variant="urgent"    />
      <StatCard title="Reminders" value={stats.reminders} icon="fa-clock"                variant="reminders" />
      <StatCard title="System"    value={stats.system}    icon="fa-server"               variant="system"    />
    </div>
  )
}
