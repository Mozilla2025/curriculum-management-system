import { AnalyticCard } from './AnalyticCard'
import { QUICK_ANALYTICS } from '@/lib/reports'

export function ReportsQuickAnalytics() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <i className="fas fa-chart-line text-must-green" aria-hidden="true" />
        Quick Analytics Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {QUICK_ANALYTICS.map((item, index) => (
          <AnalyticCard key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
