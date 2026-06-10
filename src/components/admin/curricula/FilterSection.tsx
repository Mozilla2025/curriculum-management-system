'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { School } from '@/types/curricula'

interface FilterSectionProps {
  searchTerm: string
  setSearchTerm: (val: string) => void
  isSearching?: boolean
  statusFilter: string
  setStatusFilter: (val: string) => void
  selectedSchool: string
  setSelectedSchool: (val: string) => void
  schools?: School[]
  resetFilters?: () => void
  hasActiveFilters?: boolean
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'draft', label: 'Draft' },
  { value: 'rejected', label: 'Rejected' },
]

const selectClass =
  'px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-200 hover:border-must-green focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10'

export function FilterSection({
  searchTerm,
  setSearchTerm,
  isSearching,
  statusFilter,
  setStatusFilter,
  selectedSchool,
  setSelectedSchool,
  schools = [],
  resetFilters,
  hasActiveFilters,
}: FilterSectionProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-[260px]">
        <Search
          className={cn(
            'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4',
            isSearching ? 'text-must-green animate-pulse' : 'text-gray-400'
          )}
        />
        <input
          type="search"
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10"
          placeholder="Search curriculums, departments, or schools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search curriculums"
        />
      </div>

      {/* Status dropdown */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={selectClass}
        aria-label="Filter by status"
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* School dropdown */}
      <select
        value={selectedSchool}
        onChange={(e) => setSelectedSchool(e.target.value)}
        className={selectClass}
        aria-label="Filter by school"
      >
        <option value="all">All Schools</option>
        {schools.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Clear filters */}
      {hasActiveFilters && resetFilters && (
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
        >
          <i className="fas fa-times" aria-hidden="true" />
          Clear filters
        </button>
      )}
    </div>
  )
}
