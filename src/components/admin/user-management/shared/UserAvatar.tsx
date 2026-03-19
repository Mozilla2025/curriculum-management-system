import { cn } from '@/lib/utils'

interface UserAvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export function UserAvatar({ initials, size = 'md', className }: UserAvatarProps) {
  return (
    <div
      className={cn(
        'rounded-full bg-must-green flex items-center justify-center text-white font-bold flex-shrink-0',
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}
