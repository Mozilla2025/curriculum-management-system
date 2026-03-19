import { cn } from '@/lib/utils'
import { ROLE_CONFIG } from '@/types/user-management'
import type { UserRole } from '@/types/user-management'

interface RoleBadgeProps {
  role: UserRole
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = ROLE_CONFIG[role] ?? {
    label: role,
    badgeClass: 'bg-gray-100 text-gray-600 border border-gray-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold',
        config.badgeClass,
        className
      )}
    >
      {config.label}
    </span>
  )
}
