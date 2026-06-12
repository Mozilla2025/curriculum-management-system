'use client'

import { FileText, CheckCircle, XCircle, RotateCw, Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGetAllTrackings } from '@/hooks/api/tracking'
import type { TrackingStatus } from '@/types/tracking'
import Link from 'next/link'

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffH  = Math.floor(diffMs / 3_600_000)
  const diffD  = Math.floor(diffH / 24)
  if (diffH < 1)  return 'just now'
  if (diffH < 24) return `${diffH}h ago`
  return `${diffD}d ago`
}

const STATUS_STYLE: Record<TrackingStatus, { bg: string; icon: string; Icon: React.ElementType }> = {
  IN_PROGRESS:          { bg: 'bg-must-green/10',    icon: 'text-must-green',        Icon: FileText    },
  APPROVED:             { bg: 'bg-emerald-100',       icon: 'text-emerald-600',       Icon: CheckCircle },
  COMPLETED:            { bg: 'bg-emerald-100',       icon: 'text-emerald-600',       Icon: CheckCircle },
  REJECTED:             { bg: 'bg-red-100',           icon: 'text-red-600',           Icon: XCircle     },
  RETURNED_FOR_REVISION:{ bg: 'bg-amber-100',         icon: 'text-amber-600',         Icon: RotateCw    },
  INITIATED:            { bg: 'bg-blue-50',           icon: 'text-blue-500',          Icon: Clock       },
}

function ActivitySkeleton() {
  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-100">
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex-shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-40" />
              <div className="h-2.5 bg-gray-200 rounded w-52" />
            </div>
            <div className="h-3 bg-gray-200 rounded w-10" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function RecentActivity() {
  const { data, isPending } = useGetAllTrackings({ page: 0, size: 5 })

  if (isPending && !data) return <ActivitySkeleton />

  const items = data?.trackings ?? []

  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Recent Tracking Activity</h2>
        <Link
          href="/admin/admin-curriculum-tracking"
          className="text-sm font-medium text-must-green hover:text-must-green-dark transition-colors flex items-center gap-1"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-500">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-1">
          {items.map((t) => {
            const style = STATUS_STYLE[t.status] ?? STATUS_STYLE.IN_PROGRESS
            const Icon  = style.Icon
            return (
              <div key={t.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-must-green/[0.07] mb-1.5 last:mb-0">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', style.bg)}>
                  <Icon className={cn('w-4 h-4', style.icon)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{t.displayCurriculumName}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {t.currentStageDisplayName} · {t.schoolName}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                  {relativeTime(t.createdAt)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
