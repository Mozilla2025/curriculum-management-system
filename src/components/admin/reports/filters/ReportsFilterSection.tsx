'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { FilterSelect } from './FilterSelect'
import type { ReportFilters } from '@/types/reports'
import {
  DEFAULT_FILTERS,
  ACADEMIC_YEAR_OPTIONS,
  SCHOOL_OPTIONS,
  STATUS_OPTIONS,
  REPORT_TYPE_OPTIONS,
} from '@/lib/reports'

interface ReportsFilterSectionProps {
  onApplyFilters: (filters: ReportFilters) => void
  onResetFilters: () => void
}

export function ReportsFilterSection({
  onApplyFilters,
  onResetFilters,
}: ReportsFilterSectionProps) {
  const [filters, setFilters] = useState<ReportFilters>(DEFAULT_FILTERS)
  const [isApplying, setIsApplying] = useState(false)

  const handleFilterChange = useCallback(
    (field: keyof ReportFilters, value: string) => {
      setFilters((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const handleApply = useCallback(async () => {
    setIsApplying(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsApplying(false)
    onApplyFilters(filters)
  }, [filters, onApplyFilters])

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    onResetFilters()
  }, [onResetFilters])

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <i className="fas fa-filter text-must-green" aria-hidden="true" />
        Filter Reports
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FilterSelect
          id="academic-year"
          label="Academic Year"
          value={filters.academicYear}
          onChange={(v) => handleFilterChange('academicYear', v)}
          options={ACADEMIC_YEAR_OPTIONS}
          placeholder="All Years"
        />
        <FilterSelect
          id="school-faculty"
          label="School/Faculty"
          value={filters.school}
          onChange={(v) => handleFilterChange('school', v)}
          options={SCHOOL_OPTIONS}
          placeholder="All Schools"
        />
        <FilterSelect
          id="status"
          label="Status"
          value={filters.status}
          onChange={(v) => handleFilterChange('status', v)}
          options={STATUS_OPTIONS}
          placeholder="All Statuses"
        />
        <FilterSelect
          id="report-type"
          label="Report Type"
          value={filters.reportType}
          onChange={(v) => handleFilterChange('reportType', v)}
          options={REPORT_TYPE_OPTIONS}
          placeholder="All Reports"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleApply}
          disabled={isApplying}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white',
            'bg-must-green hover:bg-must-green-dark transition-all duration-200',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'hover:-translate-y-px hover:shadow-sm',
          )}
        >
          <i
            className={cn(
              'fas',
              isApplying ? 'fa-spinner fa-spin' : 'fa-search',
            )}
            aria-hidden="true"
          />
          {isApplying ? 'Applying...' : 'Apply Filters'}
        </button>

        <button
          onClick={handleReset}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold',
            'bg-white text-gray-700 border border-gray-300',
            'hover:bg-gray-50 transition-all duration-200',
            'hover:-translate-y-px hover:shadow-sm',
          )}
        >
          <i className="fas fa-undo" aria-hidden="true" />
          Reset Filters
        </button>
      </div>
    </div>
  )
}
