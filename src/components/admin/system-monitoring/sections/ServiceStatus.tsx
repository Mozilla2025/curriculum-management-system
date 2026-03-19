import { cn } from '@/lib/utils'
import { MonitoringCard, StatusIndicator } from '../shared'
import { SERVICE_STATUS_STYLES } from '@/lib/system-monitoring/constants'
import type { SystemService } from '@/types/system-monitoring'

interface ServiceStatusProps {
  services: SystemService[]
}

export function ServiceStatus({ services }: ServiceStatusProps) {
  const onlineCount = services.filter((s) => s.status === 'online').length

  return (
    <MonitoringCard
      title="Service Status"
      icon="fas fa-cogs text-must-blue"
      status={
        <StatusIndicator
          status="healthy"
          text={`${onlineCount}/${services.length} Online`}
        />
      }
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        role="list"
        aria-label="Service statuses"
      >
        {services.map((service) => {
          const styles = SERVICE_STATUS_STYLES[service.status]
          return (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              role="listitem"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn('w-2 h-2 rounded-full flex-shrink-0', styles.dot)}
                  aria-hidden="true"
                />
                <span className="font-semibold text-gray-900 text-sm">{service.name}</span>
              </div>
              <i
                className={cn('text-sm', service.icon, styles.icon)}
                aria-label={`Status: ${service.status}`}
              />
            </div>
          )
        })}
      </div>
    </MonitoringCard>
  )
}
