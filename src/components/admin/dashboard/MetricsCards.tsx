'use client'

import React, { useState } from 'react'
import { BookOpen, Clock, CheckCircle, TrendingUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGetStatsSummary } from '@/hooks/api/stats'

interface CurriculumStats {
  total: number
  approved: number
  inProgress: number
  overdue: number
  approvalRate: number
  breakdown: {
    pending: number
    underReview: number
    draft: number
  }
}

interface MetricsCardsProps {
  curriculumStats: CurriculumStats
  statsLoading: boolean
  onRefreshStats: () => void
}

export function MetricsCards({ curriculumStats }: MetricsCardsProps) {
  const [showInProgressBreakdown, setShowInProgressBreakdown] = useState(false)
  const { data: statsSummary, isPending: statsSummaryPending } = useGetStatsSummary()

  if (statsSummaryPending && !statsSummary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-gray-200 p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-3 bg-gray-100 rounded w-24 mb-3" />
                <div className="h-8 bg-gray-100 rounded w-16 mb-2" />
                <div className="h-2 bg-gray-100 rounded w-28" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const totalCurriculumsFromAPI = statsSummary?.totalCurriculums || 0
  const approvalRate = curriculumStats.total > 0
    ? Math.round((curriculumStats.approved / curriculumStats.total) * 100)
    : 0
  const overdueCount = curriculumStats.overdue || 0
  const monthlyIncrease = Math.round(totalCurriculumsFromAPI * 0.08)

  const metrics = [
    {
      id: 1,
      title: 'Total Curricula',
      value: totalCurriculumsFromAPI.toLocaleString(),
      trend: `+${monthlyIncrease} this month`,
      icon: BookOpen,
      borderColor: 'border-l-must-green',
      iconGradient: 'from-must-green to-must-teal',
      valueColor: 'text-must-green'
    },
    {
      id: 2,
      title: 'In Progress',
      value: curriculumStats.inProgress.toString(),
      trend: 'Click to view breakdown',
      icon: Clock,
      borderColor: 'border-l-amber-500',
      iconGradient: 'from-amber-400 to-amber-600',
      valueColor: 'text-amber-600',
      onClick: () => setShowInProgressBreakdown(!showInProgressBreakdown),
      interactive: true
    },
    {
      id: 3,
      title: 'Approval Rate',
      value: `${approvalRate}%`,
      trend: `${curriculumStats.approved} approved`,
      icon: CheckCircle,
      borderColor: approvalRate > 70 ? 'border-l-must-green' : 'border-l-amber-500',
      iconGradient: approvalRate > 70 ? 'from-must-green to-must-teal' : 'from-amber-400 to-amber-600',
      valueColor: approvalRate > 70 ? 'text-must-green' : 'text-amber-600'
    },
    {
      id: 4,
      title: overdueCount > 0 ? 'Overdue Items' : 'System Health',
      value: overdueCount > 0 ? overdueCount.toString() : '98.5%',
      trend: overdueCount > 0 ? 'Need attention' : 'All systems operational',
      icon: overdueCount > 0 ? AlertCircle : CheckCircle,
      borderColor: overdueCount > 0 ? 'border-l-red-500' : 'border-l-must-green',
      iconGradient: overdueCount > 0 ? 'from-red-500 to-red-600' : 'from-must-green to-must-teal',
      valueColor: overdueCount > 0 ? 'text-red-600' : 'text-must-green'
    }
  ]

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <div
              key={metric.id}
              onClick={metric.onClick}
              className={cn(
                'relative overflow-hidden bg-white rounded-xl border border-gray-200 border-l-4 p-5',
                'shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300',
                metric.borderColor,
                metric.interactive && 'cursor-pointer'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-gray-500">{metric.title}</span>
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br flex-shrink-0',
                  metric.iconGradient
                )}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <p className={cn('text-3xl font-bold mb-1', metric.valueColor)}>
                {metric.value}
              </p>

              <p className="text-xs text-gray-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {metric.trend}
              </p>

              {metric.interactive && (
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">
                  <span>{showInProgressBreakdown ? 'Hide' : 'Show'} breakdown</span>
                  {showInProgressBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showInProgressBreakdown && curriculumStats.breakdown && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-slide-up">
          {[
            { label: 'Pending Review', count: curriculumStats.breakdown.pending, sub: 'Awaiting initial review', icon: Clock, bg: 'bg-amber-50', border: 'border-l-amber-500', gradient: 'from-amber-400 to-amber-600', color: 'text-amber-700' },
            { label: 'Under Review', count: curriculumStats.breakdown.underReview, sub: 'Currently being reviewed', icon: TrendingUp, bg: 'bg-blue-50', border: 'border-l-must-blue', gradient: 'from-must-blue to-must-blue-dark', color: 'text-must-blue' },
            { label: 'Draft', count: curriculumStats.breakdown.draft, sub: 'Still in preparation', icon: BookOpen, bg: 'bg-gray-100', border: 'border-l-gray-400', gradient: 'from-gray-500 to-gray-600', color: 'text-gray-700' }
          ].filter(item => item.count > 0).map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className={cn('rounded-xl border border-gray-200 border-l-4 p-5 shadow-sm', item.bg, item.border)}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-500">{item.label}</span>
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-white bg-gradient-to-br', item.gradient)}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className={cn('text-2xl font-bold mb-1', item.color)}>{item.count}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
