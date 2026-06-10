'use client'

import React from 'react'
import { AlertTriangle, Clock, Info, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const bottlenecks = [
  {
    id: 1,
    committee: 'Dean Committee',
    description: '8 curricula pending > 7 days',
    severity: 'critical' as const,
    icon: AlertTriangle,
    action: 'dean',
    label: 'Send Reminder'
  },
  {
    id: 2,
    committee: 'School Board',
    description: '5 curricula pending > 5 days',
    severity: 'warning' as const,
    icon: Clock,
    action: 'board',
    label: 'Send Reminder'
  },
  {
    id: 3,
    committee: 'CUE External Review',
    description: '3 curricula awaiting response',
    severity: 'info' as const,
    icon: Info,
    action: 'cue',
    label: 'Follow Up'
  }
]

const severityConfig = {
  critical: {
    border: 'border-l-red-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    titleColor: 'text-red-700',
    btnBorder: 'border-red-200 text-red-600 hover:bg-red-50'
  },
  warning: {
    border: 'border-l-amber-500',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-700',
    btnBorder: 'border-amber-200 text-amber-600 hover:bg-amber-50'
  },
  info: {
    border: 'border-l-must-blue',
    iconBg: 'bg-must-blue/10',
    iconColor: 'text-must-blue',
    titleColor: 'text-gray-700',
    btnBorder: 'border-gray-200 text-gray-600 hover:bg-gray-50'
  }
}

export function WorkflowBottlenecks({ curriculumStats }: { curriculumStats: unknown }) {
  const handleSendReminder = (action: string) => {
    alert(`Reminder sent successfully to ${action}!`)
  }

  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Workflow Bottlenecks</h2>
        <button className="text-sm font-medium text-must-green hover:text-must-green-dark transition-colors flex items-center gap-1">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {bottlenecks.map((item) => {
          const Icon = item.icon
          const cfg = severityConfig[item.severity]

          return (
            <div
              key={item.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border-l-4 bg-must-green/[0.07]',
                cfg.border
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', cfg.iconBg)}>
                  <Icon className={cn('w-4 h-4', cfg.iconColor)} />
                </div>
                <div className="min-w-0">
                  <p className={cn('text-sm font-semibold', cfg.titleColor)}>{item.committee}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleSendReminder(item.action)}
                className={cn(
                  'ml-4 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap',
                  cfg.btnBorder
                )}
              >
                {item.label}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
