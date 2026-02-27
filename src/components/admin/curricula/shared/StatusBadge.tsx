'use client'

import { cn } from '@/lib/utils'
import type { CurriculumStatus } from '@/types/curricula'

interface StatusBadgeProps {
  status: CurriculumStatus | string
  className?: string
}

const statusConfig: Record<string, { classes: string; icon: string; label: string }> = {
  approved: {
    classes: 'bg-must-green/10 text-must-green-darker border border-must-green/20',
    icon: 'fa-check-circle',
    label: 'Approved',
  },
  pending: {
    classes: 'bg-must-gold/10 text-amber-700 border border-must-gold/20',
    icon: 'fa-clock',
    label: 'Pending Review',
  },
  draft: {
    classes: 'bg-gray-100 text-gray-700 border border-gray-200',
    icon: 'fa-edit',
    label: 'Draft',
  },
  rejected: {
    classes: 'bg-red-50 text-red-600 border border-red-200',
    icon: 'fa-times-circle',
    label: 'Rejected',
  },
  under_review: {
    classes: 'bg-blue-50 text-blue-600 border border-blue-200',
    icon: 'fa-search',
    label: 'Under Review',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.draft

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm',
        config.classes,
        className
      )}
    >
      <i className={`fas ${config.icon}`} aria-hidden="true" />
      {config.label}
    </span>
  )
}