'use client'

import { cn } from '@/lib/utils'
import type { UserStats } from '@/types/user-management'

interface StatsSectionProps {
  stats: UserStats
}

interface StatCardProps {
  title: string
  value: number
  icon: string
  colorClass: string
  bgClass: string
}

function StatCard({ title, value, icon, colorClass, bgClass }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-5 transition-all duration-200 hover:shadow-medium hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-sm', bgClass, colorClass)}>
          <i className={icon} aria-hidden="true" />
        </div>
      </div>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  )
}

export function UserManagementStatsSection({ stats }: StatsSectionProps) {
  const statCards: StatCardProps[] = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: 'fas fa-users',
      colorClass: 'text-must-green-darker',
      bgClass: 'bg-must-green/10',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: 'fas fa-user-check',
      colorClass: 'text-must-blue',
      bgClass: 'bg-must-blue/10',
    },
    {
      title: 'Deans',
      value: stats.deans,
      icon: 'fas fa-crown',
      colorClass: 'text-amber-700',
      bgClass: 'bg-amber-100',
    },
    {
      title: 'Pending Access',
      value: stats.pendingAccess,
      icon: 'fas fa-user-clock',
      colorClass: 'text-red-600',
      bgClass: 'bg-red-100',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  )
}
