'use client'

import React, { useState } from 'react'
import { BookOpen, Clock, CheckCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export function MetricsCards({ curriculumStats, statsLoading }: MetricsCardsProps) {
  const [showInProgressBreakdown, setShowInProgressBreakdown] = useState(false)

  if (statsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm animate-pulse"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-7 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-2 bg-gray-200 rounded w-32" />
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const approvalRate = curriculumStats.total > 0
    ? Math.round((curriculumStats.approved / curriculumStats.total) * 100)
    : 0

  const overdueCount = curriculumStats.overdue || 0
  const monthlyIncrease = Math.round(curriculumStats.total * 0.08)

  const metrics = [
    {
      id: 1,
      title: 'Total Curricula',
      value: curriculumStats.total.toLocaleString(),
      trend: `+${monthlyIncrease} this month`,
      icon: BookOpen,
      color: 'bg-must-green',
      borderColor: 'border-must-green',
      textColor: 'text-must-green'
    },
    {
      id: 2,
      title: 'In Progress',
      value: curriculumStats.inProgress.toString(),
      trend: 'Click to view breakdown',
      icon: Clock,
      color: 'bg-amber-500',
      borderColor: 'border-amber-500',
      textColor: 'text-amber-600',
      onClick: () => setShowInProgressBreakdown(!showInProgressBreakdown),
      interactive: true
    },
    {
      id: 3,
      title: 'Approval Rate',
      value: `${approvalRate}%`,
      trend: `${curriculumStats.approved} approved`,
      icon: CheckCircle,
      color: approvalRate > 70 ? 'bg-must-green' : 'bg-amber-500',
      borderColor: approvalRate > 70 ? 'border-must-green' : 'border-amber-500',
      textColor: approvalRate > 70 ? 'text-must-green' : 'text-amber-600'
    },
    {
      id: 4,
      title: overdueCount > 0 ? 'Overdue Items' : 'System Health',
      value: overdueCount > 0 ? overdueCount.toString() : '98.5%',
      trend: overdueCount > 0 ? 'Need attention' : 'All systems operational',
      icon: overdueCount > 0 ? TrendingUp : CheckCircle,
      color: overdueCount > 0 ? 'bg-amber-500' : 'bg-purple-500',
      borderColor: overdueCount > 0 ? 'border-amber-500' : 'border-purple-500',
      textColor: overdueCount > 0 ? 'text-amber-600' : 'text-purple-600'
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
                'bg-white rounded-xl border-l-4 p-4 shadow-sm transition-all duration-300',
                'hover:shadow-md hover:-translate-y-1',
                metric.borderColor,
                metric.interactive && 'cursor-pointer'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-base font-normal text-gray-600 mb-1">
                    {metric.title}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className={cn('text-sm font-medium flex items-center gap-1', metric.textColor)}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{metric.trend}</span>
                  </div>
                </div>
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0', metric.color)}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              
              {metric.interactive && (
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span>{showInProgressBreakdown ? 'Hide' : 'Show'} breakdown</span>
                  {showInProgressBreakdown ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* In Progress Breakdown */}
      {showInProgressBreakdown && curriculumStats.breakdown && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-slide-up">
          {curriculumStats.breakdown.pending > 0 && (
            <div className="bg-white rounded-xl border-l-4 border-amber-500 p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-base font-normal text-gray-600 mb-1">
                    Pending Review
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {curriculumStats.breakdown.pending}
                  </div>
                  <div className="text-sm font-medium text-amber-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Awaiting initial review</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {curriculumStats.breakdown.underReview > 0 && (
            <div className="bg-white rounded-xl border-l-4 border-blue-500 p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-base font-normal text-gray-600 mb-1">
                    Under Review
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {curriculumStats.breakdown.underReview}
                  </div>
                  <div className="text-sm font-medium text-blue-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Currently being reviewed</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {curriculumStats.breakdown.draft > 0 && (
            <div className="bg-white rounded-xl border-l-4 border-gray-500 p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-base font-normal text-gray-600 mb-1">
                    Draft
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {curriculumStats.breakdown.draft}
                  </div>
                  <div className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Still in preparation</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gray-500 flex items-center justify-center text-white flex-shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}