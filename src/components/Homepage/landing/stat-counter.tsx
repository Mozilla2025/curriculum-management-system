'use client'

import { useCounterAnimation } from '@/hooks'

interface StatCounterProps {
  target: number
  label: string
  icon: string
  index: number
  shouldAnimate: boolean
  isLoading?: boolean
}

const ICONS: Record<string, string> = {
  'book-open':      'fas fa-book-open',
  'building':       'fas fa-building-columns',
  'graduation-cap': 'fas fa-graduation-cap',
  'users':          'fas fa-users',
}

export function StatCounter({
  target,
  label,
  icon,
  index,
  shouldAnimate,
  isLoading = false,
}: StatCounterProps) {
  const count = useCounterAnimation(target, 2000, shouldAnimate)

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <i
            className={`${ICONS[icon] ?? 'fas fa-circle'} text-must-gold text-lg md:text-xl`}
            aria-hidden="true"
          />
        )}
        {isLoading ? (
          <p className="text-3xl md:text-4xl font-bold font-display text-white/40 tabular-nums leading-none animate-pulse select-none">
            —
          </p>
        ) : (
          <p className="text-3xl md:text-4xl font-bold font-display text-white tabular-nums leading-none">
            {count}
            <span className="text-must-gold ml-0.5">+</span>
          </p>
        )}
      </div>
      <p className="mt-2 text-sm text-white/65 font-medium tracking-wide">
        {label}
      </p>
    </div>
  )
}
