'use client'

import React, { useState } from 'react'
import { Bell, FileText, RotateCw, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QuickActions() {
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const actions = [
    {
      id: 'bulk-reminders',
      title: 'Send Bulk Reminders',
      icon: Bell,
      gradient: 'from-must-green to-must-teal'
    },
    {
      id: 'system-report',
      title: 'Generate System Report',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'sync-cue',
      title: 'Sync CUE Updates',
      icon: RotateCw,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'schedule-inspections',
      title: 'Schedule Site Inspections',
      icon: Calendar,
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  const handleAction = async (actionId: string) => {
    setLoading(prev => ({ ...prev, [actionId]: true }))

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`${actions.find(a => a.id === actionId)?.title} completed successfully!`)
    } catch (error) {
      alert('Action failed. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [actionId]: false }))
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          const isLoading = loading[action.id]

          return (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              disabled={isLoading}
              className={cn(
                'w-full px-4 py-3 rounded-lg text-white font-medium text-base',
                'flex items-center justify-center gap-2',
                'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
                'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
                `bg-gradient-to-r ${action.gradient}`
              )}
            >
              <Icon className={cn('w-5 h-5', isLoading && 'animate-spin')} />
              <span>{action.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
