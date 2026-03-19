import { cn } from '@/lib/utils'
import type { UserStatus } from '@/types/user-management'

interface StatusBadgeProps {
  status: UserStatus
  className?: string
}

const statusConfig: Record<UserStatus, { label: string; classes: string }> = {
  active: {
    label: 'Active',
    classes: 'bg-must-green/10 text-must-green-darker border border-must-green/20',
  },
  inactive: {
    label: 'Inactive',
    classes: 'bg-gray-100 text-gray-600 border border-gray-200',
  },
  pending: {
    label: 'Pending',
    classes: 'bg-amber-100 text-amber-700 border border-amber-200',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.inactive

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold',
        config.classes,
        className
      )}
    >
      <i className="fas fa-circle text-[6px]" aria-hidden="true" />
      {config.label}
    </span>
  )
}
