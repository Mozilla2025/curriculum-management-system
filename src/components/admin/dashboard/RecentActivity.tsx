'use client'

import React from 'react'
import { Users, FileText, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      title: 'User account deactivated',
      description: 'John Smith (School Board) - Inactive for 30 days',
      time: '2 hours ago',
      icon: Users,
      color: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Curriculum approved',
      description: 'BSc. Cybersecurity moved to CUE Review',
      time: '4 hours ago',
      icon: FileText,
      color: 'bg-must-green'
    },
    {
      id: 3,
      title: 'Automatic reminder sent',
      description: 'Dean Committee - 3 overdue curricula',
      time: '6 hours ago',
      icon: Bell,
      color: 'bg-amber-500'
    },
    {
      id: 4,
      title: 'New user created',
      description: 'Dr. Jane Doe assigned to QA Committee',
      time: '8 hours ago',
      icon: Users,
      color: 'bg-blue-500'
    }
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent System Activity</h2>
        <button className="text-base font-medium text-must-green hover:text-must-green-dark transition-colors">
          View All
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon

            return (
              <div key={activity.id} className="relative flex gap-4">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 z-10 border-4 border-white shadow-sm',
                  activity.color
                )}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 pt-1">
                  <div className="font-semibold text-sm text-gray-900 mb-1">
                    {activity.title}
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {activity.description}
                  </div>
                  <div className="text-xs text-gray-400 font-normal">
                    {activity.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
