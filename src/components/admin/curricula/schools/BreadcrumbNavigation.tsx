'use client'

import React from 'react'
import type { BreadcrumbItem } from '@/types/curricula'

interface BreadcrumbNavigationProps {
  path: BreadcrumbItem[]
}

export function BreadcrumbNavigation({ path }: BreadcrumbNavigationProps) {
  if (!path || path.length === 0) return null

  return (
    <div className="mb-6 px-6 py-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 flex-wrap">
        {path.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <i className="fas fa-chevron-right text-gray-400 text-xs" />
            )}
            {item.action ? (
              <button
                onClick={item.action}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-[#00BF63] rounded-md hover:bg-[#00BF63] hover:text-white transition-all"
              >
                {item.label}
              </button>
            ) : (
              <span className="px-3 py-1.5 text-sm font-semibold text-gray-800">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}