'use client'

import React, { useState } from 'react'
import { AlertTriangle, Clock, Info, CheckCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const initialAlerts = [
  {
    id: 1,
    type: 'critical' as const,
    title: 'Critical Delay Alert',
    description: '5 curricula have been pending at Senate stage for over 14 days',
    icon: AlertTriangle,
    actionLabel: 'Take Action'
  },
  {
    id: 2,
    type: 'warning' as const,
    title: 'CUE Response Overdue',
    description: '3 curricula awaiting CUE response beyond expected timeframe',
    icon: Clock,
    actionLabel: 'Follow Up'
  },
  {
    id: 3,
    type: 'info' as const,
    title: 'User Login Anomaly',
    description: 'Multiple failed login attempts detected from unusual locations',
    icon: Info,
    actionLabel: 'View Details'
  }
]

const alertConfig = {
  critical: {
    border: 'border-l-red-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title: 'text-red-800'
  },
  warning: {
    border: 'border-l-amber-500',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'text-amber-800'
  },
  info: {
    border: 'border-l-must-blue',
    iconBg: 'bg-must-blue/10',
    iconColor: 'text-must-blue',
    title: 'text-gray-800'
  }
}

export function SystemAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)

  const handleDismiss = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">System Alerts</h2>
        {alerts.length > 0 && (
          <span className="text-xs font-semibold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
            {alerts.length} Active
          </span>
        )}
      </div>

      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = alert.icon
            const cfg = alertConfig[alert.type]

            return (
              <div
                key={alert.id}
                className={cn(
                  'flex gap-3 p-3 rounded-lg border-l-4 bg-must-green/[0.07]',
                  cfg.border
                )}
              >
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', cfg.iconBg)}>
                  <Icon className={cn('w-4 h-4', cfg.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-semibold mb-0.5', cfg.title)}>{alert.title}</p>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">{alert.description}</p>
                  <button className="text-xs font-semibold text-must-green hover:text-must-green-dark hover:underline transition-colors">
                    {alert.actionLabel}
                  </button>
                </div>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors mt-0.5"
                  aria-label="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-must-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-must-green" />
          </div>
          <p className="text-sm font-medium text-gray-600">All systems running smoothly</p>
          <p className="text-xs text-gray-400 mt-0.5">No active alerts</p>
        </div>
      )}
    </div>
  )
}
