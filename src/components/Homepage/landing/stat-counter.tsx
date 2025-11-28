'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui'
import { useCounterAnimation } from '@/hooks'
import type { StatItem } from '@/types'

interface StatCounterProps extends StatItem {
  index: number
  shouldAnimate: boolean
}

export function StatCounter({ 
  target, 
  icon, 
  label, 
  index, 
  shouldAnimate 
}: StatCounterProps) {
  const count = useCounterAnimation(target, 2000, shouldAnimate)

  return (
    <div
      className={cn(
        'bg-white/95 rounded-xl p-5 text-center shadow-medium',
        'border border-white/30 transition-all duration-300',
        'hover:-translate-y-2 hover:scale-105 hover:bg-white hover:shadow-strong',
        'animate-float relative overflow-hidden group'
      )}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      
      {/* Icon - solid teal/green background with white icon */}
      <div 
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2',
          'bg-must-teal text-white'
        )}
      >
        <Icon name={icon} size={18} />
      </div>
      
      {/* Counter */}
      <span 
        className={cn(
          'block text-3xl md:text-4xl font-black mb-1',
          'bg-gradient-gold bg-clip-text text-transparent'
        )}
      >
        {count}
      </span>
      
      {/* Label */}
      <span className="text-gray-600 text-sm font-semibold">
        {label}
      </span>
    </div>
  )
}