import { cn } from '@/lib/utils'
import { MonitoringCard, StatusIndicator } from '../shared'
import type { SecurityMetric } from '@/types/system-monitoring'

const SECURITY_METRICS: SecurityMetric[] = [
  {
    name: 'Failed Login Attempts',
    details: 'Last 24 hours',
    value: '23',
    colorClass: 'text-must-gold',
  },
  {
    name: 'Blocked IPs',
    details: 'Currently blacklisted',
    value: '7',
    colorClass: 'text-red-500',
  },
  {
    name: 'SSL Certificate',
    details: 'Days until expiration',
    value: '89',
    colorClass: 'text-must-green',
  },
]

export function SecurityMonitor() {
  return (
    <MonitoringCard
      title="Security Monitor"
      icon="fas fa-shield-alt text-must-green"
      status={<StatusIndicator status="healthy" text="Secure" />}
    >
      <ul className="space-y-1" role="list" aria-label="Security metrics">
        {SECURITY_METRICS.map((metric) => (
          <li
            key={metric.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-semibold text-gray-900 text-sm">{metric.name}</p>
              <p className="text-xs text-gray-500">{metric.details}</p>
            </div>
            <span className={cn('text-lg font-semibold flex-shrink-0', metric.colorClass)}>
              {metric.value}
            </span>
          </li>
        ))}
      </ul>
    </MonitoringCard>
  )
}
