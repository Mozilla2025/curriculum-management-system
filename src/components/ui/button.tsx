import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import type { ButtonVariant, ButtonSize } from '@/types'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-must-gold to-must-gold-light text-gray-900
    hover:shadow-gold hover:-translate-y-0.5 hover:scale-105
    active:scale-100
  `,
  secondary: `
    bg-white/15 text-white border-2 border-white/40 backdrop-blur-sm
    hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5
  `,
  outline: `
    bg-transparent border-2 border-must-green text-must-green
    hover:bg-must-green hover:text-white
  `,
  ghost: `
    bg-transparent text-must-green
    hover:bg-must-green-lighter hover:text-must-green-darker
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    leftIcon, 
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-bold rounded-lg transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-must-gold',
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
          'relative overflow-hidden',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-500" />
        
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : leftIcon}
        
        <span className="relative z-10">{children}</span>
        
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'