import { cn } from '@/lib/utils'

interface MonitoringCardProps {
  title?: string
  icon?: string
  status?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function MonitoringCard({
  title,
  icon,
  status,
  actions,
  children,
  className,
}: MonitoringCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:-translate-y-px',
        className
      )}
    >
      {(title || icon || status || actions) && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            {icon && <i className={cn(icon, 'text-gray-500')} aria-hidden="true" />}
            {title}
          </h2>
          <div className="flex items-center gap-3">
            {status}
            {actions}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
