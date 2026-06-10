'use client'

import React, { useState } from 'react'
import { Bell, FileText, RotateCw, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const actions = [
  {
    id: 'bulk-reminders',
    title: 'Send Bulk Reminders',
    icon: Bell,
    bgClass: 'bg-must-green/10',
    iconClass: 'text-must-green-darker',
    hoverClass: 'hover:bg-must-green/20'
  },
  {
    id: 'system-report',
    title: 'Generate System Report',
    icon: FileText,
    bgClass: 'bg-must-blue/10',
    iconClass: 'text-must-blue',
    hoverClass: 'hover:bg-must-blue/20'
  },
  {
    id: 'sync-cue',
    title: 'Sync CUE Updates',
    icon: RotateCw,
    bgClass: 'bg-purple-100',
    iconClass: 'text-purple-600',
    hoverClass: 'hover:bg-purple-100/80'
  },
  {
    id: 'schedule-inspections',
    title: 'Schedule Site Inspections',
    icon: Calendar,
    bgClass: 'bg-amber-100',
    iconClass: 'text-amber-700',
    hoverClass: 'hover:bg-amber-100/80'
  }
]

export function QuickActions() {
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const handleAction = async (actionId: string) => {
    setLoading(prev => ({ ...prev, [actionId]: true }))
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`${actions.find(a => a.id === actionId)?.title} completed successfully!`)
    } catch {
      alert('Action failed. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [actionId]: false }))
    }
  }

  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 border-t-2 border-t-must-green p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>

      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon
          const isLoading = loading[action.id]

          return (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              disabled={isLoading}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                'text-sm font-medium text-gray-700 hover:text-gray-900',
                'bg-must-green/[0.07] border border-transparent hover:bg-must-green/[0.12] hover:border-must-green/20',
                'transition-all duration-150 group',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                action.bgClass,
                action.hoverClass
              )}>
                <Icon className={cn('w-4 h-4', action.iconClass, isLoading && 'animate-spin')} />
              </div>
              <span>{action.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
