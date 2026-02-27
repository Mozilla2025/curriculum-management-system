'use client'

import { cn } from '@/lib/utils'
import type { School, Program } from '@/types/curricula'

interface FilterSectionProps {
  searchTerm: string
  setSearchTerm: (val: string) => void
  statusFilter: string
  setStatusFilter: (val: string) => void
  isSearching?: boolean
  viewMode: 'schools' | 'table'
  onViewModeChange: (mode: 'schools' | 'table') => void
  showAdvancedFilters?: boolean
  selectedSchool: string
  setSelectedSchool: (val: string) => void
  selectedProgram: string
  setSelectedProgram: (val: string) => void
  selectedDepartment: string
  setSelectedDepartment: (val: string) => void
  sortBy: string
  setSortBy: (val: string) => void
  schools?: School[]
  programs?: Program[]
  departments?: string[]
  resetFilters?: () => void
  hasActiveFilters?: boolean
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'draft', label: 'Draft' },
  { value: 'rejected', label: 'Rejected' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'department', label: 'Department A-Z' },
]

const selectClass =
  'w-full px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md appearance-none cursor-pointer transition-all duration-200 hover:border-must-green focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10'

export function FilterSection({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isSearching,
  viewMode,
  onViewModeChange,
  showAdvancedFilters,
  selectedSchool,
  setSelectedSchool,
  selectedProgram,
  setSelectedProgram,
  selectedDepartment,
  setSelectedDepartment,
  sortBy,
  setSortBy,
  schools = [],
  programs = [],
  departments = [],
  resetFilters,
  hasActiveFilters,
}: FilterSectionProps) {
  return (
    <div className="mb-8 space-y-4">
      {/* View Mode Toggle */}
      <div className="flex w-fit gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-soft">
        <button
          onClick={() => onViewModeChange('schools')}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300',
            viewMode === 'schools'
              ? 'bg-gradient-to-r from-must-green via-must-green-dark to-must-teal text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          )}
        >
          <i className="fas fa-sitemap" aria-hidden="true" />
          Schools View
        </button>
        <button
          onClick={() => onViewModeChange('table')}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300',
            viewMode === 'table'
              ? 'bg-gradient-to-r from-must-green via-must-green-dark to-must-teal text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          )}
        >
          <i className="fas fa-table" aria-hidden="true" />
          All Curricula
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[260px]">
            <i
              className={cn(
                'fas absolute left-4 top-1/2 -translate-y-1/2 text-gray-400',
                isSearching ? 'fa-spinner fa-spin' : 'fa-search'
              )}
              aria-hidden="true"
            />
            <input
              type="search"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10"
              placeholder="Search curricula, departments, or schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search curricula"
            />
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={cn(
                  'px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all duration-300',
                  statusFilter === opt.value
                    ? 'bg-gradient-to-r from-must-green via-must-green-dark to-must-teal text-white border-must-green'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-must-green hover:-translate-y-px hover:shadow-soft'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Reset filters */}
          {hasActiveFilters && resetFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <i className="fas fa-times" aria-hidden="true" />
              Reset
            </button>
          )}
        </div>

        {/* Advanced Filters (table view only) */}
        {showAdvancedFilters && (
          <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200">
            <div className="flex-1 min-w-[140px] relative">
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
            </div>

            <div className="flex-1 min-w-[140px] relative">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className={selectClass}
                aria-label="Filter by program"
              >
                <option value="all">All Programs</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[140px] relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={selectClass}
                aria-label="Filter by department"
              >
                <option value="all">All Departments</option>
                {departments.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[140px] relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={selectClass}
                aria-label="Sort curricula"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}