'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { TrackingStatsData, CurriculumTracking } from '@/types/tracking'

interface Props {
  stats: TrackingStatsData
  curricula: CurriculumTracking[]
  currentView: string
  currentDataSource: string
}

interface StatCardProps {
  title: string; value: number; icon: string
  accent: string; iconBg: string; description?: string
  onClick?: () => void; actionLabel?: string
}

function StatCard({ title, value, icon, accent, iconBg, description, onClick, actionLabel }: StatCardProps) {
  return (
    <div onClick={onClick}
      className={cn('relative overflow-hidden rounded-xl border-l-4 bg-gradient-to-br from-white to-gray-50 p-5 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-0.5', accent, onClick && 'cursor-pointer')}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          {description && <p className="text-xs text-gray-400">{description}</p>}
        </div>
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br', iconBg)}>
          <i className={cn('fas', icon, 'text-sm')} aria-hidden="true" />
        </div>
      </div>
      <p className="text-4xl font-extrabold text-gray-800">{value}</p>
      {actionLabel && (
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <i className="fas fa-chevron-down text-[10px]" aria-hidden="true" />{actionLabel}
        </p>
      )}
    </div>
  )
}

export function TrackingStats({ stats, curricula, currentView }: Props) {
  const [showAnalytics, setShowAnalytics] = useState(false)

  const byStage   = Object.entries(stats.byStage   ?? {}).filter(([, v]) => v > 0)
  const byStatus  = Object.entries(stats.byStatus  ?? {}).filter(([, v]) => v > 0)
  const byPriority = Object.entries(stats.byPriority ?? {}).filter(([, v]) => v > 0)

  const total = stats.total ?? curricula.length

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="Total Trackings"  value={total}                    icon="fa-route"         accent="border-l-must-blue"   iconBg="from-must-blue to-must-blue-dark" />
        <StatCard title="In Progress"      value={stats.inProgress ?? 0}    icon="fa-clock"         accent="border-l-amber-500"   iconBg="from-amber-500 to-amber-600" />
        <StatCard title="On Hold"          value={stats.onHold ?? 0}        icon="fa-pause-circle"  accent="border-l-red-500"     iconBg="from-red-500 to-red-600" />
        <StatCard title="Completed"        value={stats.completed ?? 0}     icon="fa-check-circle"  accent="border-l-must-green"  iconBg="from-must-green to-must-green-dark"
          onClick={() => setShowAnalytics(!showAnalytics)}
          actionLabel={`${showAnalytics ? 'Hide' : 'Show'} breakdown analytics`} />
      </div>

      {showAnalytics && (byStage.length > 0 || byStatus.length > 0 || byPriority.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          {byStage.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <i className="fas fa-sitemap text-must-green" aria-hidden="true" /> By Stage
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {byStage.map(([stage, count]) => (
                  <div key={stage} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-600 font-medium capitalize">{stage.replace(/_/g, ' ')}</span>
                    <span className="text-xs font-bold text-gray-800 bg-must-green/10 text-must-green-darker px-2 py-0.5 rounded-full">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {byStatus.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <i className="fas fa-info-circle text-must-blue" aria-hidden="true" /> By Status
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {byStatus.map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-600 font-medium capitalize">{status.replace(/_/g, ' ')}</span>
                    <span className="text-xs font-bold text-gray-800 bg-must-blue/10 text-must-blue px-2 py-0.5 rounded-full">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {byPriority.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <i className="fas fa-flag text-amber-500" aria-hidden="true" /> By Priority
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {byPriority.map(([priority, count]) => {
                  const color = priority === 'high' ? 'text-red-600 bg-red-50' : priority === 'medium' ? 'text-amber-600 bg-amber-50' : 'text-gray-600 bg-gray-100'
                  return (
                    <div key={priority} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-600 font-medium capitalize">{priority}</span>
                      <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', color)}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
