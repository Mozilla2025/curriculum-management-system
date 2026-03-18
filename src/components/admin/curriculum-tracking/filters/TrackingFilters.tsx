'use client'

import { cn } from '@/lib/utils'
import type { TrackingFiltersState, TrackingStageKey, TrackingViewMode } from '@/types/tracking'
import { TRACKING_STAGES, STATUS_LABELS } from '@/lib/tracking/constants'

interface Props {
  filters: TrackingFiltersState
  schools: string[]
  departments: string[]
  stages: TrackingStageKey[]
  statuses: string[]
  currentViewMode: TrackingViewMode
  onFilterChange: (key: keyof TrackingFiltersState, value: string) => void
  onClearFilters: () => void
}

const selectCls = 'w-full px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer transition-all hover:border-must-green focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10'

export function TrackingFilters({ filters, schools, departments, stages, statuses, onFilterChange, onClearFilters }: Props) {
  const hasActive = Object.values(filters).some(Boolean)

  const activeChips = Object.entries(filters)
    .filter(([, v]) => v)
    .map(([k, v]) => ({ key: k as keyof TrackingFiltersState, label: `${k.replace(/([A-Z])/g, ' $1').trim()}: ${v}` }))

  return (
    <div className="mb-6 space-y-3">
      {/* Search bar */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-must-green text-sm" aria-hidden="true" />
            <input
              type="search"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search by title, tracking ID, school, or department…"
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10 transition-all"
              aria-label="Search curriculum trackings"
            />
          </div>

          <div className="flex-1 min-w-[140px]">
            <select value={filters.school} onChange={(e) => onFilterChange('school', e.target.value)} className={selectCls} aria-label="Filter by school">
              <option value="">All Schools</option>
              {schools.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <select value={filters.department} onChange={(e) => onFilterChange('department', e.target.value)} className={selectCls} aria-label="Filter by department">
              <option value="">All Departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[160px]">
            <select value={filters.stage} onChange={(e) => onFilterChange('stage', e.target.value)} className={selectCls} aria-label="Filter by stage">
              <option value="">All Stages</option>
              {TRACKING_STAGES.map((s) => <option key={s.key} value={s.key}>{s.title}</option>)}
            </select>
          </div>

          <div className="flex-1 min-w-[140px]">
            <select value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className={selectCls} aria-label="Filter by status">
              <option value="">All Statuses</option>
              {statuses.map((s) => <option key={s} value={s}>{STATUS_LABELS[s] ?? s}</option>)}
            </select>
          </div>

          {hasActive && (
            <button onClick={onClearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <i className="fas fa-times" aria-hidden="true" /> Reset
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400 font-medium">Active:</span>
            {activeChips.map(({ key, label }) => (
              <span key={key}
                className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 text-xs font-semibold rounded-full bg-must-green/10 text-must-green-darker border border-must-green/20">
                {label}
                <button onClick={() => onFilterChange(key, '')}
                  className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-must-green/20 transition-colors" aria-label={`Remove ${label} filter`}>
                  <i className="fas fa-times text-[9px]" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
