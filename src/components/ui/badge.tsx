import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'gold' | 'outline'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-must-green-lighter text-must-green-darker',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  gold: 'bg-must-gold/20 text-must-gold-dark',
  outline: 'bg-transparent border border-white/40 text-white backdrop-blur-sm',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full',
          'text-sm font-semibold',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'