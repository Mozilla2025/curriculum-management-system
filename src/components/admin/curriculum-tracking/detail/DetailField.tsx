import { cn } from '@/lib/utils'
import { formatTrackingDate, formatTrackingDateTime } from '@/lib/tracking/utils'

interface DetailFieldProps {
  label: string
  value?: string | number | boolean | null
  type?: 'text' | 'date' | 'datetime' | 'email' | 'boolean'
  icon?: string
  className?: string
}

export function DetailField({ label, value, type = 'text', icon, className }: DetailFieldProps) {
  const isEmpty = value === undefined || value === null || value === ''
  const display = isEmpty
    ? 'Not specified'
    : type === 'date'
    ? formatTrackingDate(String(value))
    : type === 'datetime'
    ? formatTrackingDateTime(String(value))
    : type === 'boolean'
    ? null
    : String(value)

  return (
    <div className={cn('p-4 bg-white rounded-xl border border-gray-200', className)}>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-1.5">
        {icon && <i className={cn(icon, 'text-must-green-darker/70')} aria-hidden="true" />}
        {label}
      </div>

      {type === 'boolean' ? (
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
          value
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-gray-50 text-gray-500 border-gray-200',
        )}>
          <i className={cn('fas text-[10px]', value ? 'fa-check' : 'fa-times')} aria-hidden="true" />
          {value ? 'Yes' : 'No'}
        </span>
      ) : type === 'email' && value ? (
        <a href={`mailto:${value}`} className="text-sm font-medium text-must-green-darker hover:underline">
          {String(value)}
        </a>
      ) : (
        <p className={cn('text-sm font-medium', isEmpty ? 'text-gray-400 italic' : 'text-gray-800')}>
          {display}
        </p>
      )}
    </div>
  )
}
