'use client'

import { BookOpen, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useGetStatsSummary } from '@/hooks/api/stats'
import { useGetCurriculumStats } from '@/hooks/api/curricula'

function MetricsSkeleton() {
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

export function MetricsCards() {
  const [showBreakdown, setShowBreakdown] = useState(false)

  const { data: summary,   isPending: summaryPending }  = useGetStatsSummary()
  const { data: currStats, isPending: currStatsPending } = useGetCurriculumStats()

  if ((summaryPending && !summary) || (currStatsPending && !currStats)) {
    return <MetricsSkeleton />
  }

  const total        = summary?.totalCurriculums ?? 0
  const approved     = currStats?.approved     ?? 0
  const pending      = currStats?.pending       ?? 0
  const underReview  = currStats?.underReview   ?? 0
  const inProgress   = pending + underReview
  const approvalRate = (currStats?.total ?? 0) > 0
    ? Math.round((approved / currStats!.total) * 100)
    : 0

  const metrics = [
    {
      id: 'total',
      title:    'Total Curricula',
      value:    total.toLocaleString(),
      trend:    `${summary?.totalSchools ?? 0} schools · ${summary?.totalDepartments ?? 0} departments`,
      icon:     BookOpen,
      border:   'border-l-must-green',
      gradient: 'from-must-green to-must-teal',
      color:    'text-must-green',
    },
    {
      id:          'progress',
      title:       'In Progress',
      value:       inProgress.toString(),
      trend:       'Click to view breakdown',
      icon:        Clock,
      border:      'border-l-amber-500',
      gradient:    'from-amber-400 to-amber-600',
      color:       'text-amber-600',
      interactive: true,
      onClick:     () => setShowBreakdown((v) => !v),
    },
    {
      id:       'approval',
      title:    'Approval Rate',
      value:    `${approvalRate}%`,
      trend:    `${approved} approved of ${currStats?.total ?? 0}`,
      icon:     CheckCircle,
      border:   approvalRate > 70 ? 'border-l-must-green' : 'border-l-amber-500',
      gradient: approvalRate > 70 ? 'from-must-green to-must-teal' : 'from-amber-400 to-amber-600',
      color:    approvalRate > 70 ? 'text-must-green' : 'text-amber-600',
    },
    {
      id:       'health',
      title:    'System Health',
      value:    '98.5%',
      trend:    'All services operational',
      icon:     AlertCircle,
      border:   'border-l-must-green',
      gradient: 'from-must-green to-must-teal',
      color:    'text-must-green',
    },
  ]

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div
              key={m.id}
              onClick={m.onClick}
              className={cn(
                'relative overflow-hidden bg-white rounded-xl border border-gray-200 border-l-4 p-5',
                'shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300',
                m.border,
                m.interactive && 'cursor-pointer',
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-gray-500">{m.title}</span>
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br flex-shrink-0', m.gradient)}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className={cn('text-3xl font-bold mb-1', m.color)}>{m.value}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {m.trend}
              </p>
              {m.interactive && (
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">
                  <span>{showBreakdown ? 'Hide' : 'Show'} breakdown</span>
                  {showBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showBreakdown && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 animate-slide-up">
          {[
            { label: 'Pending Review',  count: pending,     sub: 'Awaiting initial review',    gradient: 'from-amber-400 to-amber-600',   bg: 'bg-amber-50',  border: 'border-l-amber-500',  color: 'text-amber-700' },
            { label: 'Under Review',    count: underReview, sub: 'Currently being reviewed',   gradient: 'from-blue-500 to-blue-600',     bg: 'bg-blue-50',   border: 'border-l-blue-500',   color: 'text-blue-700'  },
          ].map((item) => (
            <div key={item.label} className={cn('rounded-xl border border-gray-200 border-l-4 p-5 shadow-sm', item.bg, item.border)}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">{item.label}</span>
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-white bg-gradient-to-br', item.gradient)}>
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className={cn('text-2xl font-bold mb-1', item.color)}>{item.count}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
