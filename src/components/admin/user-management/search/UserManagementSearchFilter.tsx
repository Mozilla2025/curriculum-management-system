'use client'

import type { UserFilters } from '@/types/user-management'

interface SearchFilterProps {
  filters: UserFilters
  onSearch: (value: string) => void
  onRoleFilter: (value: string) => void
  onStatusFilter: (value: string) => void
  onClearFilters: () => void
}

const selectClass =
  'w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-200 hover:border-must-green focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10'

export function UserManagementSearchFilter({
  filters,
  onSearch,
  onRoleFilter,
  onStatusFilter,
  onClearFilters,
}: SearchFilterProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-end">
        {/* Search */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="user-search" className="text-sm font-semibold text-gray-700">
            Search Users
          </label>
          <div className="relative">
            <i
              className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              aria-hidden="true"
            />
            <input
              id="user-search"
              type="text"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-400 transition-all focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10"
              placeholder="Search by name, email, or username..."
              value={filters.search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Role filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role-filter" className="text-sm font-semibold text-gray-700">
            Filter by Role
          </label>
          <select
            id="role-filter"
            className={selectClass}
            value={filters.role}
            onChange={(e) => onRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="DEAN">Dean of School</option>
            <option value="QA">Quality Assurance</option>
            <option value="DEPT_REP">Department Rep</option>
            <option value="SENATE">Senate</option>
          </select>
        </div>

        {/* Status filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status-filter" className="text-sm font-semibold text-gray-700">
            Filter by Status
          </label>
          <select
            id="status-filter"
            className={selectClass}
            value={filters.status}
            onChange={(e) => onStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Clear filters */}
        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 w-full justify-center"
          >
            <i className="fas fa-filter text-xs" aria-hidden="true" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
