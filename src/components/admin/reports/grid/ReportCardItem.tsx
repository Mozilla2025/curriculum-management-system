'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getIconColorClass } from '@/lib/reports'
import type { ReportCard } from '@/types/reports'

interface ReportCardProps {
  report: ReportCard
  onView: (title: string) => void
  onExport: (title: string) => void
}

export function ReportCardItem({ report, onView, onExport }: ReportCardProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = useCallback(async () => {
    setIsExporting(true)
    await new Promise((r) => setTimeout(r, 2000))
    setIsExporting(false)
    onExport(report.title)
  }, [report.title, onExport])

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 p-6 shadow-soft',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium',
      )}
    >
      {/* Card Header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0',
            getIconColorClass(report.iconColor),
          )}
        >
          <i className={cn('fas', report.icon)} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 leading-tight">
            {report.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{report.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900">{report.statNumber}</div>
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mt-0.5">
          {report.statLabel}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(report.title)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white',
            'bg-must-green hover:bg-must-green-dark transition-colors duration-200',
          )}
        >
          <i className="fas fa-eye text-xs" aria-hidden="true" />
          View Report
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
            'bg-white text-gray-700 border border-gray-300',
            'hover:bg-gray-50 transition-colors duration-200',
            'disabled:opacity-60 disabled:cursor-not-allowed',
          )}
        >
          <i
            className={cn(
              'fas text-xs',
              isExporting ? 'fa-spinner fa-spin' : 'fa-download',
            )}
            aria-hidden="true"
          />
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>
    </div>
  )
}
