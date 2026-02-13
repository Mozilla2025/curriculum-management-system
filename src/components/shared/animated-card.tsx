'use client'

import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
  isVisible?: boolean
  className?: string
  hoverEffect?: boolean
}

export function AnimatedCard({
  children,
  delay = 0,
  isVisible = true,
  className,
  hoverEffect = true,
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-soft',
        'transition-all duration-500 ease-out',
        'relative overflow-hidden',
        // Animation states
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8',
        // Hover effects
        hoverEffect && [
          'hover:-translate-y-2 hover:shadow-strong hover:border-must-green',
          'group cursor-pointer',
        ],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Shine effect on hover */}
      {hoverEffect && (
        <div 
          className={cn(
            'absolute inset-0 -translate-x-full',
            'bg-gradient-to-r from-transparent via-must-green/10 to-transparent',
            'group-hover:translate-x-full transition-transform duration-600',
            'pointer-events-none'
          )}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}