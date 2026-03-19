import { cn } from '@/lib/utils'
import { STATUS_INDICATOR_STYLES } from '@/lib/system-monitoring/constants'
import type { StatusIndicatorVariant } from '@/types/system-monitoring'

interface StatusIndicatorProps {
  status: StatusIndicatorVariant
  text: string
  animated?: boolean
  className?: string
}

export function StatusIndicator({ status, text, animated, className }: StatusIndicatorProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
        STATUS_INDICATOR_STYLES[status],
        animated && 'animate-pulse',
        className
      )}
    >
      <i className="fas fa-circle text-[0.5rem]" aria-hidden="true" />
      {text}
    </div>
  )
}
