'use client'

import { AlertTriangle, Clock, Info, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGetAllTrackings } from '@/hooks/api/tracking'
import type { TrackingStage } from '@/types/tracking'

// Stages in order of approval pipeline — used to sort bottleneck display
const STAGE_ORDER: TrackingStage[] = [
  'IDEATION',
  'REVIEW_APPROVAL',
  'SCHOOL_BOARD',
  'DEAN_COMMITTEE',
  'SENATE',
  'QA_INTERNAL_AUDIT',
  'CUE_EXTERNAL_AUDIT',
  'VICE_CHANCELLOR_APPROVAL',
]

const STAGE_LABELS: Record<TrackingStage, string> = {
  IDEATION:                  'Ideation',
  REVIEW_APPROVAL:           'Review & Approval',
  SCHOOL_BOARD:              'School Board',
  DEAN_COMMITTEE:            'Dean Committee',
  SENATE:                    'Senate',
  QA_INTERNAL_AUDIT:         'Quality Assurance',
  CUE_EXTERNAL_AUDIT:        'CUE External Review',
  VICE_CHANCELLOR_APPROVAL:  'Vice Chancellor',
  ACCREDITED:                'Accredited',
}

const severityConfig = {
  critical: {
    border:  'border-l-red-500',
    iconBg:  'bg-red-100',
    icon:    'text-red-600',
    title:   'text-red-700',
    btn:     'border-red-200 text-red-600 hover:bg-red-50',
    Icon:    AlertTriangle,
  },
  warning: {
    border:  'border-l-amber-500',
    iconBg:  'bg-amber-100',
    icon:    'text-amber-600',
    title:   'text-amber-700',
    btn:     'border-amber-200 text-amber-600 hover:bg-amber-50',
    Icon:    Clock,
  },
  info: {
    border:  'border-l-blue-400',
    iconBg:  'bg-blue-50',
    icon:    'text-blue-500',
    title:   'text-gray-700',
    btn:     'border-gray-200 text-gray-600 hover:bg-gray-50',
    Icon:    Info,
  },
}

function BottleneckSkeleton() {
  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="h-4 bg-gray-200 rounded w-40" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-28" />
              <div className="h-2.5 bg-gray-200 rounded w-44" />
            </div>
            <div className="h-7 w-24 bg-gray-200 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function WorkflowBottlenecks() {
  const { data, isPending } = useGetAllTrackings({ page: 0, size: 50 })

  if (isPending && !data) return <BottleneckSkeleton />

  // Count active (non-completed) items per stage
  const stageCounts = new Map<TrackingStage, number>()
  for (const t of data?.trackings ?? []) {
    if (t.status === 'COMPLETED' || t.status === 'APPROVED') continue
    stageCounts.set(t.currentStage, (stageCounts.get(t.currentStage) ?? 0) + 1)
  }

  // Sort by pipeline order and take top 3 non-empty stages
  const bottlenecks = STAGE_ORDER
    .filter((s) => (stageCounts.get(s) ?? 0) > 0)
    .sort((a, b) => (stageCounts.get(b) ?? 0) - (stageCounts.get(a) ?? 0))
    .slice(0, 3)
    .map((stage, i) => {
      const count   = stageCounts.get(stage) ?? 0
      const severity = i === 0 && count >= 5 ? 'critical' : i === 0 ? 'warning' : 'info'
      return { stage, count, severity: severity as 'critical' | 'warning' | 'info' }
    })

  const total = data?.totalElements ?? 0

  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Workflow Bottlenecks</h2>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          {total} total
        </span>
      </div>

      {bottlenecks.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-10 h-10 bg-must-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <ArrowRight className="w-5 h-5 text-must-green" />
          </div>
          <p className="text-sm font-medium text-gray-600">No bottlenecks detected</p>
          <p className="text-xs text-gray-400 mt-0.5">All workflow stages are clear</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bottlenecks.map(({ stage, count, severity }) => {
            const cfg  = severityConfig[severity]
            const Icon = cfg.Icon
            return (
              <div key={stage} className={cn('flex items-center justify-between p-3 rounded-lg border-l-4 bg-must-green/[0.07]', cfg.border)}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', cfg.iconBg)}>
                    <Icon className={cn('w-4 h-4', cfg.icon)} />
                  </div>
                  <div className="min-w-0">
                    <p className={cn('text-sm font-semibold', cfg.title)}>{STAGE_LABELS[stage] ?? stage}</p>
                    <p className="text-xs text-gray-500">{count} curricul{count === 1 ? 'um' : 'a'} pending here</p>
                  </div>
                </div>
                <button
                  className={cn('ml-4 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap', cfg.btn)}
                >
                  Send Reminder
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
