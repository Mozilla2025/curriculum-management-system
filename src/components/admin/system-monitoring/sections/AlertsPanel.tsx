import { cn } from '@/lib/utils'
import { MonitoringCard } from '../shared'
import { ALERT_STYLES } from '@/lib/system-monitoring/constants'
import type { SystemAlert } from '@/types/system-monitoring'

interface AlertsPanelProps {
  alerts: SystemAlert[]
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <MonitoringCard
      title="Recent Alerts"
      icon="fas fa-exclamation-triangle"
      actions={
        <button
          className="px-3 py-1 text-xs font-medium bg-must-green text-white rounded-lg hover:bg-must-green-dark transition-colors"
          aria-label="View all alerts"
        >
          View All
        </button>
      }
    >
      <ul className="space-y-3" role="list" aria-label="System alerts">
        {alerts.map((alert) => {
          const styles = ALERT_STYLES[alert.type]
          return (
            <li
              key={alert.id}
              className={cn(
                'flex items-start gap-3 p-4 rounded-r-lg',
                styles.container
              )}
            >
              <i
                className={cn('text-xl mt-0.5 flex-shrink-0', alert.icon, styles.iconColor)}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm mb-1">{alert.title}</p>
                <p className="text-sm text-gray-500 mb-1">{alert.message}</p>
                <time className="text-xs text-gray-400">{alert.time}</time>
              </div>
            </li>
          )
        })}
      </ul>
    </MonitoringCard>
  )
}
