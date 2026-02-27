'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  className?: string
}

export function EmptyState({ icon = 'fa-book-open', title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(
      'text-center py-12 px-6 bg-white rounded-xl border border-gray-200',
      className
    )}>
      <i className={`fas ${icon} text-4xl text-gray-300 mb-4 block`} />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          disabled={action.disabled}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00D666] via-[#00BF63] to-[#00a855] text-white rounded-lg text-sm font-semibold hover:-translate-y-px hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          <i className="fas fa-refresh" />
          {action.label}
        </button>
      )}
    </div>
  )
}