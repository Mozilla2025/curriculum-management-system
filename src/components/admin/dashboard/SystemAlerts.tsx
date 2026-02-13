'use client'

import React, { useState } from 'react'
import { AlertTriangle, Clock, Info, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SystemAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical' as const,
      title: 'Critical Delay Alert',
      description: '5 curricula have been pending at Senate stage for over 14 days',
      icon: AlertTriangle
    },
    {
      id: 2,
      type: 'warning' as const,
      title: 'CUE Response Overdue',
      description: '3 curricula awaiting CUE response beyond expected timeframe',
      icon: Clock
    },
    {
      id: 3,
      type: 'info' as const,
      title: 'User Login Anomaly',
      description: 'Multiple failed login attempts detected from unusual locations',
      icon: Info
    }
  ])

  const handleDismiss = (alertId: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          title: 'text-red-900',
          description: 'text-red-700',
          icon: 'text-red-500'
        }
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          title: 'text-amber-900',
          description: 'text-amber-700',
          icon: 'text-amber-500'
        }
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          title: 'text-blue-900',
          description: 'text-blue-700',
          icon: 'text-blue-500'
        }
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">System Alerts</h2>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const Icon = alert.icon
            const styles = getAlertStyles(alert.type)

            return (
              <div
                key={alert.id}
                className={cn(
                  'p-3 rounded-lg border transition-all duration-300',
                  styles.bg,
                  styles.border
                )}
              >
                <div className="flex gap-3">
                  <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.icon)} />
                  
                  <div className="flex-1 min-w-0">
                    <div className={cn('font-semibold text-sm mb-1', styles.title)}>
                      {alert.title}
                    </div>
                    <div className={cn('text-xs mb-3', styles.description)}>
                      {alert.description}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs font-medium text-must-green hover:underline">
                        {alert.type === 'critical' ? 'Take Action' : alert.type === 'warning' ? 'Follow Up' : 'View Details'}
                      </button>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-base text-gray-500">No active alerts. All systems running smoothly!</p>
          </div>
        )}
      </div>
    </div>
  )
}
