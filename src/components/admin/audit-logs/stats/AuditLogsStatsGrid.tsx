'use client'

import { CheckCircle, AlertCircle, XCircle, Activity, AlertTriangle } from 'lucide-react'
import type { AuditLogsStats } from '@/types/audit-logs'

interface AuditLogsStatsGridProps {
  stats: AuditLogsStats
}

export function AuditLogsStatsGrid({ stats }: AuditLogsStatsGridProps) {
  const statCards = [
    {
      title: 'Total Actions',
      value: stats.totalActions.toLocaleString(),
      icon: Activity,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Successful',
      value: stats.successfulActions.toLocaleString(),
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
    },
    {
      title: 'Warnings',
      value: stats.warningActions.toLocaleString(),
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
    },
    {
      title: 'Failed',
      value: stats.failedActions.toLocaleString(),
      icon: XCircle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
    },
    {
      title: 'Critical (Today)',
      value: stats.criticalActionsToday.toLocaleString(),
      icon: AlertCircle,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.title}
            className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-4 transition-transform hover:scale-105`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <Icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
