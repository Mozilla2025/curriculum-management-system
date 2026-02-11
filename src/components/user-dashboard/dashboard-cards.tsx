// src/components/user-dashboard/dashboard-cards.tsx

'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui'
import { useCounterAnimation, useIntersection } from '@/hooks'
import type { DashboardStats } from '@/types/user-dashboard'

interface DashboardCard {
  id: string
  value: number
  label: string
  icon: string
  gradient: string
  trend?: string
  trendIcon?: string
}

interface DashboardCardsProps {
  stats: DashboardStats
  loading?: boolean
}

const gradients = {
  green: 'bg-gradient-green',
  gold: 'bg-gradient-gold',
  teal: 'bg-gradient-teal',
  purple: 'bg-gradient-to-br from-purple-500 to-purple-700',
}

export function DashboardCards({ stats, loading = false }: DashboardCardsProps) {
  const { ref, isIntersecting } = useIntersection()

  const cards: DashboardCard[] = [
    {
      id: 'curricula',
      value: stats.totalCurricula,
      label: 'Total Curricula',
      icon: 'book-open',
      gradient: 'green',
      trend: '+12 this month',
      trendIcon: 'trending-up',
    },
    {
      id: 'schools',
      value: stats.totalSchools,
      label: 'Academic Schools',
      icon: 'building',
      gradient: 'gold',
      trend: 'All active',
      trendIcon: 'check',
    },
    {
      id: 'programs',
      value: stats.totalPrograms,
      label: 'Academic Levels',
      icon: 'graduation-cap',
      gradient: 'teal',
    },
    {
      id: 'departments',
      value: stats.totalDepartments,
      label: 'Departments',
      icon: 'users',
      gradient: 'purple',
      trend: 'High activity',
      trendIcon: 'star',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            </div>
            <div className="h-7 bg-gray-200 rounded w-20 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, index) => (
        <DashboardCard
          key={card.id}
          card={card}
          index={index}
          shouldAnimate={isIntersecting}
        />
      ))}
    </div>
  )
}

interface DashboardCardItemProps {
  card: DashboardCard
  index: number
  shouldAnimate: boolean
}

function DashboardCard({ card, index, shouldAnimate }: DashboardCardItemProps) {
  const count = useCounterAnimation(card.value, 2000, shouldAnimate)

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 p-4',
        'transition-all duration-500 hover:shadow-strong hover:border-must-green',
        'hover:-translate-y-1 relative overflow-hidden group',
        shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Top gradient bar */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1',
          gradients[card.gradient as keyof typeof gradients]
        )}
      />

      {/* Icon */}
      <div className="flex justify-between items-start mb-3">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            'text-white shadow-soft transition-transform duration-300',
            'group-hover:scale-110 group-hover:rotate-6',
            gradients[card.gradient as keyof typeof gradients]
          )}
        >
          <Icon name={card.icon} size={20} />
        </div>
      </div>

      {/* Value */}
      <div className="text-2xl font-black text-gray-900 mb-1">{count}</div>

      {/* Label */}
      <div className="text-sm font-medium text-gray-600 mb-2">{card.label}</div>

      {/* Trend */}
      {card.trend && (
        <div className="flex items-center gap-1 text-xs font-semibold text-must-green">
          {card.trendIcon && <Icon name={card.trendIcon} size={10} />}
          <span>{card.trend}</span>
        </div>
      )}

      {/* Shimmer effect */}
      <div
        className={cn(
          'absolute inset-0 -translate-x-full',
          'bg-gradient-to-r from-transparent via-white/40 to-transparent',
          'group-hover:translate-x-full transition-transform duration-700'
        )}
      />
    </div>
  )
}