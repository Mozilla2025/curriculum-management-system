'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import type { AuditLogsFilters } from '@/types/audit-logs'

interface AuditLogsFilterSectionProps {
  onApplyFilters?: (filters: AuditLogsFilters) => void
  onResetFilters?: () => void
}

const actionOptions = [
  { value: '', label: 'All Actions' },
  { value: 'CREATE', label: 'Create' },
  { value: 'UPDATE', label: 'Update' },
  { value: 'DELETE', label: 'Delete' },
  { value: 'VIEW', label: 'View' },
  { value: 'EXPORT', label: 'Export' },
  { value: 'LOGIN', label: 'Login' },
  { value: 'LOGOUT', label: 'Logout' },
  { value: 'PERMISSION_CHANGE', label: 'Permission Change' },
  { value: 'ROLE_CHANGE', label: 'Role Change' },
  { value: 'SYSTEM_SETTING', label: 'System Setting' },
  { value: 'BULK_OPERATION', label: 'Bulk Operation' },
]

const entityTypeOptions = [
  { value: '', label: 'All Entity Types' },
  { value: 'user', label: 'User' },
  { value: 'curriculum', label: 'Curriculum' },
  { value: 'course', label: 'Course' },
  { value: 'department', label: 'Department' },
  { value: 'permission', label: 'Permission' },
  { value: 'role', label: 'Role' },
  { value: 'system_setting', label: 'System Setting' },
  { value: 'report', label: 'Report' },
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
]

const severityOptions = [
  { value: '', label: 'All Severity' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export function AuditLogsFilterSection({
  onApplyFilters,
  onResetFilters,
}: AuditLogsFilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<AuditLogsFilters>({
    search: '',
    action: '',
    entityType: '',
    status: '',
    severity: '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
    performedBy: '',
  })

  const handleFilterChange = (key: keyof AuditLogsFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value,
      },
    }))
  }

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters)
    }
    setIsExpanded(false)
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      action: '',
      entityType: '',
      status: '',
      severity: '',
      dateRange: {
        startDate: '',
        endDate: '',
      },
      performedBy: '',
    })
    if (onResetFilters) {
      onResetFilters()
    }
  }

  const hasActiveFilters = 
    filters.search || 
    filters.action || 
    filters.entityType || 
    filters.status || 
    filters.severity || 
    filters.dateRange.startDate || 
    filters.dateRange.endDate || 
    filters.performedBy

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by entity name, user, or IP address..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold"
          />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
            isExpanded || hasActiveFilters
              ? 'bg-must-gold text-gray-900 border-must-gold'
              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-red-500 text-white rounded-full">!</span>}
        </button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Action Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Action
              </label>
              <select
                value={filters.action}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold text-sm"
              >
                {actionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Entity Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Entity Type
              </label>
              <select
                value={filters.entityType}
                onChange={(e) => handleFilterChange('entityType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold text-sm"
              >
                {entityTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Severity
              </label>
              <select
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold text-sm"
              >
                {severityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range and Performed By */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.dateRange.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.dateRange.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Performed By
              </label>
              <input
                type="text"
                placeholder="User name or email"
                value={filters.performedBy}
                onChange={(e) => handleFilterChange('performedBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-must-gold text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold text-sm"
            >
              <X className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-must-gold text-gray-900 hover:bg-must-gold/90 rounded-lg transition-colors font-semibold text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
