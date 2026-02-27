'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumStats } from '@/types/curricula'

interface StatsGridProps {
  stats: CurriculumStats
}

interface StatCardProps {
  title: string
  value: number
  icon: string
  variant: 'total' | 'approved' | 'pending' | 'draft' | 'rejected'
  subtitle?: string
  onClick?: () => void
  breakdown?: { label: string; value: number }[]
}

const variantStyles = {
  total: {
    bar: 'from-must-blue to-must-blue-dark',
    icon: 'from-must-blue to-must-blue-dark',
  },
  approved: {
    bar: 'from-must-green via-must-green-dark to-must-teal',
    icon: 'from-must-green via-must-green-dark to-must-teal',
  },
  pending: {
    bar: 'from-must-gold via-amber-400 to-amber-600',
    icon: 'from-must-gold via-amber-400 to-amber-600',
  },
  draft: {
    bar: 'from-gray-500 to-gray-600',
    icon: 'from-gray-500 to-gray-600',
  },
  rejected: {
    bar: 'from-red-500 to-red-600',
    icon: 'from-red-500 to-red-600',
  },
}

function StatCard({ title, value, icon, variant, subtitle, onClick, breakdown }: StatCardProps) {
  const styles = variantStyles[variant]
  
  const borderColorMap = {
    total: 'border-must-blue',
    approved: 'border-must-green',
    pending: 'border-amber-500',
    draft: 'border-gray-500',
    rejected: 'border-red-500',
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-xl border-l-4 bg-gradient-to-br from-white to-gray-50 p-6 shadow-soft transition-all duration-300',
        'hover:shadow-medium hover:-translate-y-0.5',
        borderColorMap[variant],
        onClick ? 'cursor-pointer' : ''
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-semibold text-gray-500">{title}</span>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br',
            styles.icon
          )}
        >
          <i className={`fas ${icon} text-sm`} aria-hidden="true" />
        </div>
      </div>

      <p className="text-4xl font-bold text-gray-800 leading-none">{value}</p>

      {breakdown && breakdown.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
          {breakdown.map((item) => (
            <div key={item.label} className="flex justify-between text-xs text-gray-500">
              <span>{item.label}:</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function StatsGrid({ stats }: StatsGridProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  const totalInProgress = (stats.pending ?? 0) + (stats.underReview ?? 0) + (stats.draft ?? 0)

  const breakdown = [
    { label: 'Pending Review', value: stats.pending ?? 0 },
    { label: 'Under Review', value: stats.underReview ?? 0 },
    { label: 'Draft', value: stats.draft ?? 0 },
  ].filter((item) => item.value > 0)

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Curricula" value={stats.total ?? 0} icon="fa-book" variant="total" />
        <StatCard
          title="Approved"
          value={stats.approved ?? 0}
          icon="fa-check-circle"
          variant="approved"
          subtitle="Active and ready"
        />
        <StatCard
          title="In Progress"
          value={totalInProgress}
          icon="fa-clock"
          variant="pending"
          subtitle={`Click to ${showBreakdown ? 'hide' : 'show'} breakdown`}
          onClick={() => setShowBreakdown(!showBreakdown)}
          breakdown={showBreakdown ? breakdown : undefined}
        />
        <StatCard
          title="Rejected"
          value={stats.rejected ?? 0}
          icon="fa-times-circle"
          variant="rejected"
          subtitle="Declined or inactive"
        />
      </div>

      {showBreakdown && breakdown.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 animate-slide-up">
          {(stats.pending ?? 0) > 0 && (
            <StatCard
              title="Pending Review"
              value={stats.pending ?? 0}
              icon="fa-hourglass-start"
              variant="pending"
              subtitle="Awaiting initial review"
            />
          )}
          {(stats.underReview ?? 0) > 0 && (
            <StatCard
              title="Under Review"
              value={stats.underReview ?? 0}
              icon="fa-search"
              variant="pending"
              subtitle="Currently being reviewed"
            />
          )}
          {(stats.draft ?? 0) > 0 && (
            <StatCard
              title="Draft"
              value={stats.draft ?? 0}
              icon="fa-edit"
              variant="draft"
              subtitle="Still in preparation"
            />
          )}
        </div>
      )}
    </div>
  )
}