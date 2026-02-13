import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

interface SpinnerProps {
  size?: SpinnerSize
  message?: string
  subtext?: string
  className?: string
  fullScreen?: boolean
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
  xl: 'w-14 h-14',
}

export function Spinner({ 
  size = 'lg', 
  message, 
  subtext, 
  className,
  fullScreen = false 
}: SpinnerProps) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <Loader2 
        className={cn(
          'animate-spin text-must-green',
          sizeStyles[size]
        )} 
      />
      {message && (
        <p className="text-gray-700 font-medium">{message}</p>
      )}
      {subtext && (
        <p className="text-gray-500 text-sm">{subtext}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}