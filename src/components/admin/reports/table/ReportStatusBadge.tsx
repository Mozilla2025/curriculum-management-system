import { cn } from '@/lib/utils'
import { getStatusLabel, getStatusBadgeClass } from '@/lib/reports'
import type { ReportStatus } from '@/types/reports'

interface ReportStatusBadgeProps {
  status: ReportStatus
}

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getStatusBadgeClass(status),
      )}
    >
      {getStatusLabel(status)}
    </span>
  )
}
