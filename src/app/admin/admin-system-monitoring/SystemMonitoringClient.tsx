'use client'

import { useSystemMetrics } from '@/lib/system-monitoring/useSystemMetrics'
import { MOCK_ALERTS, MOCK_SERVICES } from '@/lib/system-monitoring/constants'
import { MetricsGrid } from '@/components/admin/system-monitoring/cards'
import { PerformanceChart } from '@/components/admin/system-monitoring/charts'
import {
  SystemMonitoringHeader,
  AlertsPanel,
  SystemResources,
  ServiceStatus,
  DatabasePerformance,
  SecurityMonitor,
} from '@/components/admin/system-monitoring/sections'

export function SystemMonitoringClient() {
  const { metrics, isRefreshing, handleRefresh } = useSystemMetrics()

  return (
    <div className="space-y-6 animate-fade-in">
      <SystemMonitoringHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <PerformanceChart />
        <AlertsPanel alerts={MOCK_ALERTS} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SystemResources metrics={metrics} />
        <ServiceStatus services={MOCK_SERVICES} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DatabasePerformance />
        <SecurityMonitor />
      </div>
    </div>
  )
}
