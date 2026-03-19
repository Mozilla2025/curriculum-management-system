import { cn } from '@/lib/utils'
import { PROGRESS_STYLES } from '@/lib/system-monitoring/constants'
import type { ResourceHealthType } from '@/types/system-monitoring'

interface ProgressBarProps {
  percentage: number
  healthType: ResourceHealthType
  className?: string
}

export function ProgressBar({ percentage, healthType, className }: ProgressBarProps) {
  return (
    <div
      className={cn('w-full h-2 bg-gray-200 rounded-full overflow-hidden my-2', className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-300',
          PROGRESS_STYLES[healthType]
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
