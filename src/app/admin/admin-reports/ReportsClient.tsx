'use client'

import { useCallback } from 'react'
import { ReportsPageHeader } from '@/components/admin/reports/shared'
import { ReportsFilterSection } from '@/components/admin/reports/filters'
import { ReportsQuickAnalytics } from '@/components/admin/reports/analytics'
import { ReportsGrid } from '@/components/admin/reports/grid'
import { RecentReportsTable } from '@/components/admin/reports/table'
import type { ReportFilters } from '@/types/reports'

export function ReportsClient() {
  const handleApplyFilters = useCallback((filters: ReportFilters) => {
    console.log('Filters applied:', filters)
  }, [])

  const handleResetFilters = useCallback(() => {
    console.log('Filters reset')
  }, [])

  const handleViewReport = useCallback((title: string) => {
    console.log('Viewing report:', title)
  }, [])

  const handleExportReport = useCallback((title: string) => {
    console.log('Exporting report:', title)
  }, [])

  return (
    <div className="animate-fade-in">
      <ReportsPageHeader />

      <ReportsQuickAnalytics />

      <ReportsFilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <ReportsGrid
        onViewReport={handleViewReport}
        onExportReport={handleExportReport}
      />

      <RecentReportsTable />
    </div>
  )
}
