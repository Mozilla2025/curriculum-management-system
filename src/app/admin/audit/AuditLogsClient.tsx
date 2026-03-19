'use client'

import { useCallback, useState } from 'react'
import { AuditLogsPageHeader } from '@/components/admin/audit-logs/shared'
import { AuditLogsFilterSection } from '@/components/admin/audit-logs/filters'
import { AuditLogsStatsGrid } from '@/components/admin/audit-logs/stats'
import { AuditLogsTable } from '@/components/admin/audit-logs/table'
import { AuditLogDetailsModal } from '@/components/admin/audit-logs/shared'
import { mockAuditLogs, mockAuditLogsStats } from '@/lib/mock-data'
import type { AuditLogsFilters, AuditLog } from '@/types/audit-logs'

export function AuditLogsClient() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }, [])

  const handleApplyFilters = useCallback((filters: AuditLogsFilters) => {
    // Filter the logs based on the applied filters
    let filtered = [...mockAuditLogs]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (log) =>
          log.entityName.toLowerCase().includes(searchLower) ||
          log.performedBy.email.toLowerCase().includes(searchLower) ||
          log.performedBy.name.toLowerCase().includes(searchLower) ||
          log.ipAddress.includes(searchLower) ||
          log.description.toLowerCase().includes(searchLower)
      )
    }

    if (filters.action) {
      filtered = filtered.filter((log) => log.action === filters.action)
    }

    if (filters.entityType) {
      filtered = filtered.filter((log) => log.entityType === filters.entityType)
    }

    if (filters.status) {
      filtered = filtered.filter((log) => log.status === filters.status)
    }

    if (filters.severity) {
      filtered = filtered.filter((log) => log.severity === filters.severity)
    }

    if (filters.dateRange.startDate) {
      const startDate = new Date(filters.dateRange.startDate)
      filtered = filtered.filter((log) => log.timestamp >= startDate)
    }

    if (filters.dateRange.endDate) {
      const endDate = new Date(filters.dateRange.endDate)
      endDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter((log) => log.timestamp <= endDate)
    }

    if (filters.performedBy) {
      const performedByLower = filters.performedBy.toLowerCase()
      filtered = filtered.filter(
        (log) =>
          log.performedBy.name.toLowerCase().includes(performedByLower) ||
          log.performedBy.email.toLowerCase().includes(performedByLower)
      )
    }

    setFilteredLogs(filtered)
  }, [])

  const handleResetFilters = useCallback(() => {
    setFilteredLogs(mockAuditLogs)
  }, [])

  const handleViewDetails = useCallback((log: AuditLog) => {
    setSelectedLog(log)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedLog(null), 300)
  }, [])

  return (
    <div className="animate-fade-in">
      <AuditLogsPageHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      <AuditLogsStatsGrid stats={mockAuditLogsStats} />

      <AuditLogsFilterSection
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <AuditLogsTable logs={filteredLogs} onViewDetails={handleViewDetails} />

      <AuditLogDetailsModal
        log={selectedLog}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
