'use client'

import { cn } from '@/lib/utils'
import { StatusIndicator } from '../shared'

interface SystemMonitoringHeaderProps {
  onRefresh: () => void
  isRefreshing: boolean
}

export function SystemMonitoringHeader({ onRefresh, isRefreshing }: SystemMonitoringHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 md:text-3xl">
            <i className="fas fa-chart-line text-must-blue" aria-hidden="true" />
            System Monitoring
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Real-time system performance and health monitoring
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusIndicator status="healthy" text="System Healthy" animated />

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-must-green text-white rounded-lg text-sm font-medium shadow-sm transition-all hover:bg-must-green-dark hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            aria-label="Refresh system data"
          >
            <i
              className={cn(
                'fas text-sm',
                isRefreshing ? 'fa-spinner fa-spin' : 'fa-sync-alt'
              )}
              aria-hidden="true"
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>

          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-must-blue text-white rounded-lg text-sm font-medium shadow-sm transition-all hover:bg-must-blue-dark hover:-translate-y-0.5 hover:shadow-md"
            aria-label="Configure alerts"
          >
            <i className="fas fa-cog text-sm" aria-hidden="true" />
            Configure Alerts
          </button>
        </div>
      </div>
    </div>
  )
}
