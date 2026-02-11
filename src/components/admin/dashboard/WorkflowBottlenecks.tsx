'use client'

import React from 'react'
import { AlertTriangle, Clock, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export function WorkflowBottlenecks({ curriculumStats }: { curriculumStats: any }) {
  const bottlenecks = [
    {
      id: 1,
      committee: 'Dean Committee',
      description: '8 curricula pending > 7 days',
      severity: 'critical' as const,
      icon: AlertTriangle,
      action: 'dean'
    },
    {
      id: 2,
      committee: 'School Board',
      description: '5 curricula pending > 5 days',
      severity: 'warning' as const,
      icon: Clock,
      action: 'board'
    },
    {
      id: 3,
      committee: 'CUE External Review',
      description: '3 curricula awaiting response',
      severity: 'info' as const,
      icon: Info,
      action: 'cue'
    }
  ]

  const handleSendReminder = (action: string) => {
    alert(`Reminder sent successfully to ${action}!`)
  }

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-l-red-500',
          text: 'text-red-700',
          icon: 'text-red-500',
          button: 'bg-red-500 hover:bg-red-600'
        }
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-l-amber-500',
          text: 'text-amber-700',
          icon: 'text-amber-500',
          button: 'bg-amber-500 hover:bg-amber-600'
        }
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-l-blue-500',
          text: 'text-blue-700',
          icon: 'text-blue-500',
          button: 'bg-blue-500 hover:bg-blue-600'
        }
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Workflow Bottlenecks</h2>
        <button className="text-base font-medium text-must-green hover:text-must-green-dark transition-colors">
          View Details
        </button>
      </div>

      <div className="space-y-4">
        {bottlenecks.map((bottleneck) => {
          const Icon = bottleneck.icon
          const styles = getSeverityStyles(bottleneck.severity)

          return (
            <div
              key={bottleneck.id}
              className={cn(
                'flex items-center justify-between p-4 rounded-lg border-l-4 transition-all duration-300',
                styles.bg,
                styles.border
              )}
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon className={cn('w-5 h-5 flex-shrink-0', styles.icon)} />
                <div className="flex-1 min-w-0">
                  <div className={cn('font-semibold text-base mb-1', styles.text)}>
                    {bottleneck.committee}
                  </div>
                  <div className="text-sm text-gray-600">
                    {bottleneck.description}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSendReminder(bottleneck.action)}
                className={cn(
                  'px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap ml-3',
                  styles.button
                )}
              >
                {bottleneck.action === 'cue' ? 'Follow Up' : 'Send Reminder'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
