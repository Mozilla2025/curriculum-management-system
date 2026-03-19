import { MonitoringCard, StatusIndicator } from '../shared'

export function PerformanceChart() {
  return (
    <MonitoringCard
      title="Performance Trends"
      icon="fas fa-chart-area text-must-blue"
      status={<StatusIndicator status="healthy" text="Live Data" />}
    >
      <div
        className="h-[300px] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg border-2 border-dashed border-slate-300 text-slate-500"
        aria-label="Performance chart placeholder"
      >
        <i className="fas fa-chart-line text-5xl" aria-hidden="true" />
        <p className="font-medium">Real-time Performance Chart</p>
        <p className="text-sm">CPU, Memory, Network I/O</p>
      </div>
    </MonitoringCard>
  )
}
