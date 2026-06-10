'use client'

import React from 'react'
import { Users, FileText, Bell, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const activities = [
  {
    id: 1,
    title: 'User account deactivated',
    description: 'John Smith (School Board) — Inactive for 30 days',
    time: '2h ago',
    icon: Users,
    bgClass: 'bg-red-100',
    iconClass: 'text-red-600'
  },
  {
    id: 2,
    title: 'Curriculum approved',
    description: 'BSc. Cybersecurity moved to CUE Review',
    time: '4h ago',
    icon: FileText,
    bgClass: 'bg-must-green/10',
    iconClass: 'text-must-green-darker'
  },
  {
    id: 3,
    title: 'Automatic reminder sent',
    description: 'Dean Committee — 3 overdue curricula',
    time: '6h ago',
    icon: Bell,
    bgClass: 'bg-amber-100',
    iconClass: 'text-amber-700'
  },
  {
    id: 4,
    title: 'New user created',
    description: 'Dr. Jane Doe assigned to QA Committee',
    time: '8h ago',
    icon: Users,
    bgClass: 'bg-must-blue/10',
    iconClass: 'text-must-blue'
  }
]

export function RecentActivity() {
  return (
    <div className="bg-emerald-50/40 rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm font-medium text-must-green hover:text-must-green-dark transition-colors flex items-center gap-1">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-must-green/[0.07] mb-1.5 last:mb-0">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', activity.bgClass)}>
                <Icon className={cn('w-4 h-4', activity.iconClass)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500 truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0 mt-0.5">{activity.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
