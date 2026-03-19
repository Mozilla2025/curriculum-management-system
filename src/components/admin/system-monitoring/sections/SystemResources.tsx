import { cn } from '@/lib/utils'
import { MonitoringCard, ProgressBar, StatusIndicator } from '../shared'
import type { SystemMetrics, ResourceItem } from '@/types/system-monitoring'

interface SystemResourcesProps {
  metrics: SystemMetrics
}

function buildResources(metrics: SystemMetrics): ResourceItem[] {
  return [
    {
      name: 'CPU Usage',
      details: '8 cores, 3.2 GHz',
      percentage: metrics.cpuUsage,
      healthType: 'healthy',
    },
    {
      name: 'Memory Usage',
      details: '32 GB RAM',
      percentage: metrics.memoryUsage,
      healthType: 'warning',
    },
    {
      name: 'Disk Usage',
      details: '1 TB SSD',
      percentage: metrics.diskUsage,
      healthType: 'healthy',
    },
    {
      name: 'Network I/O',
      details: '1 Gbps connection',
      percentage: metrics.networkIO,
      healthType: 'healthy',
    },
  ]
}

const percentageColorMap: Record<string, string> = {
  healthy: 'text-must-green',
  warning: 'text-must-gold',
  critical: 'text-red-500',
}

export function SystemResources({ metrics }: SystemResourcesProps) {
  const resources = buildResources(metrics)

  return (
    <MonitoringCard
      title="System Resources"
      icon="fas fa-server text-must-green"
      status={<StatusIndicator status="healthy" text="Optimal" />}
    >
      <ul className="space-y-1" role="list" aria-label="System resources">
        {resources.map((resource) => (
          <li
            key={resource.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1 min-w-0 mr-4">
              <p className="font-semibold text-gray-900 text-sm">{resource.name}</p>
              <p className="text-xs text-gray-500 mb-1">{resource.details}</p>
              <ProgressBar percentage={resource.percentage} healthType={resource.healthType} />
            </div>
            <div className="text-right flex-shrink-0 min-w-[60px]">
              <span
                className={cn(
                  'text-lg font-semibold',
                  percentageColorMap[resource.healthType]
                )}
              >
                {resource.percentage}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </MonitoringCard>
  )
}
