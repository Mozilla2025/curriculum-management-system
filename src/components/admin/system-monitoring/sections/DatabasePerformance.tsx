import { cn } from '@/lib/utils'
import { MonitoringCard, StatusIndicator } from '../shared'
import type { DatabaseMetric } from '@/types/system-monitoring'

const DB_METRICS: DatabaseMetric[] = [
  {
    name: 'Query Response',
    details: 'Average response time',
    value: '28ms',
    colorClass: 'text-must-green',
  },
  {
    name: 'Active Connections',
    details: 'Current database connections',
    value: '147',
    colorClass: 'text-must-blue',
  },
  {
    name: 'Buffer Hit Ratio',
    details: 'Cache efficiency',
    value: '98.7%',
    colorClass: 'text-must-green',
  },
]

export function DatabasePerformance() {
  return (
    <MonitoringCard
      title="Database Performance"
      icon="fas fa-database text-must-blue"
      status={<StatusIndicator status="healthy" text="Healthy" />}
    >
      <ul className="space-y-1" role="list" aria-label="Database performance metrics">
        {DB_METRICS.map((metric) => (
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
