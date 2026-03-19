import { cn } from '@/lib/utils'
import type { SystemMetrics, MetricCardConfig } from '@/types/system-monitoring'

interface MetricsGridProps {
  metrics: SystemMetrics
}

function buildMetricCards(metrics: SystemMetrics): MetricCardConfig[] {
  const approvalRate = metrics.uptime

  return [
    {
      id: 1,
      title: 'System Uptime',
      value: `${metrics.uptime}%`,
      trend: '+0.2% from last month',
      colorClass: 'text-must-green',
      borderColorClass: 'border-l-must-green',
      textColorClass: 'text-must-green',
      bgColorClass: 'border-l-must-green',
      changeType: 'up',
    },
    {
      id: 2,
      title: 'Response Time',
      value: `${metrics.responseTime}ms`,
      trend: '-15ms improvement',
      colorClass: 'text-must-blue',
      borderColorClass: 'border-l-must-blue',
      textColorClass: 'text-must-blue',
      bgColorClass: 'border-l-must-blue',
      changeType: 'down',
    },
    {
      id: 3,
      title: 'Active Users',
      value: metrics.activeUsers.toLocaleString(),
      trend: '+23 since last hour',
      colorClass: 'text-must-gold',
      borderColorClass: 'border-l-must-gold',
      textColorClass: 'text-must-gold',
      bgColorClass: 'border-l-must-gold',
      changeType: 'up',
    },
    {
      id: 4,
      title: 'Error Rate',
      value: `${metrics.errorRate}%`,
      trend: '-0.01% reduction',
      colorClass: 'text-red-500',
      borderColorClass: 'border-l-red-500',
      textColorClass: 'text-red-500',
      bgColorClass: 'border-l-red-500',
      changeType: 'down',
    },
  ]
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const cards = buildMetricCards(metrics)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className={cn(
            'bg-white rounded-xl p-4 shadow-sm border border-gray-200 border-l-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1',
            card.borderColorClass
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-2">{card.title}</p>
              <p className={cn('text-2xl md:text-3xl font-bold mb-2', card.colorClass)}>{card.value}</p>
              <p
                className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  card.changeType === 'up' ? 'text-must-green' : 'text-red-500'
                )}
              >
                <i
                  className={cn(
                    'fas text-xs',
                    card.changeType === 'up' ? 'fa-arrow-up' : 'fa-arrow-down'
                  )}
                  aria-hidden="true"
                />
                <span>{card.trend}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
