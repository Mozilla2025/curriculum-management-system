import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  height?: string
  width?: string
}

export function Skeleton({ className, height = 'h-4', width = 'w-full' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse',
        height,
        width,
        className
      )}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite',
      }}
    />
  )
}

interface SkeletonLineProps {
  lines?: number
  className?: string
}

export function SkeletonLines({ lines = 3, className }: SkeletonLineProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="h-4"
          width={i === lines - 1 ? 'w-2/3' : 'w-full'}
        />
      ))}
    </div>
  )
}

interface SkeletonCardProps {
  count?: number
  className?: string
  lines?: number
}

export function SkeletonCard({ count = 1, className, lines = 3 }: SkeletonCardProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-gray-200 shadow-soft p-6 animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <Skeleton height="h-5" width="w-1/3" />
            <Skeleton height="h-10" width="w-10" className="rounded-full" />
          </div>
          <SkeletonLines lines={lines} />
        </div>
      ))}
    </div>
  )
}

interface SkeletonTableProps {
  rows?: number
  columns?: number
}

export function SkeletonTable({ rows = 5, columns = 5 }: SkeletonTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-soft overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} height="h-4" width={`w-${(i + 1) * 10}`} />
          ))}
        </div>
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="px-6 py-4 border-b border-gray-100 flex gap-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={colIdx} height="h-4" width={`w-${(colIdx + 1) * 10}`} />
          ))}
        </div>
      ))}
    </div>
  )
}
