
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthSubmitButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
  type?: 'submit' | 'button'
  onClick?: () => void
}

export function AuthSubmitButton({
  children,
  isLoading,
  loadingText,
  icon,
  disabled,
  className,
  type = 'submit',
  onClick,
}: AuthSubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-center gap-2',
        'bg-must-green text-white font-medium text-base',
        'py-3.5 px-4 rounded-md shadow-sm',
        'transition-all duration-200',
        'hover:bg-must-green-dark hover:shadow-md hover:-translate-y-px',
        'active:translate-y-0 active:shadow-sm',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
        'focus-visible:outline-2 focus-visible:outline-must-green-darker focus-visible:outline-offset-2',
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span>{loadingText ?? 'Loading...'}</span>
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  )
}