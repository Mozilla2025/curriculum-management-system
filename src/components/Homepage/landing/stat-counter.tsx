'use client'

import { useCounterAnimation } from '@/hooks'
import type { StatItem } from '@/types'

interface StatCounterProps extends StatItem {
  index: number
  shouldAnimate: boolean
}

export function StatCounter({ target, label, index, shouldAnimate }: StatCounterProps) {
  const count = useCounterAnimation(target, 2000, shouldAnimate)

  return (
    <div
      className="border-t border-white/30 pt-6"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <p className="text-3xl md:text-4xl font-bold font-display text-white tabular-nums">
        {count}
        <span className="text-must-gold ml-0.5">+</span>
      </p>
      <p className="mt-1.5 text-sm text-white/85 font-medium tracking-wide">
        {label}
      </p>
    </div>
  )
}
