import { cn } from '@/lib/utils'
import { getAnalyticColorClasses } from '@/lib/reports'
import type { QuickAnalyticItem } from '@/types/reports'

interface AnalyticCardProps {
  item: QuickAnalyticItem
}

export function AnalyticCard({ item }: AnalyticCardProps) {
  const colors = getAnalyticColorClasses(item.color)

  return (
    <div
      className={cn(
        'text-center p-4 rounded-lg border',
        colors.border,
        colors.bg,
      )}
    >
      <div className={cn('text-4xl font-bold mb-2', colors.text)}>
        {item.number}
      </div>
      <div className="text-sm font-medium text-gray-500">{item.label}</div>
    </div>
  )
}
