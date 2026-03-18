'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { TrackingViewMode, TrackingStatsData } from '@/types/tracking'
import { VIEW_MODE_NAMES } from '@/lib/tracking/constants'

interface Props {
  currentViewMode: TrackingViewMode
  trackingStats?: TrackingStatsData
  trackingCount?: number
  onRefresh: () => void
  onInitiateCurriculum: () => void
  onViewMode: (mode: TrackingViewMode) => void
  onShowMyInitiated: () => void
  onShowMyAssigned: () => void
  onShowBySchool: (id: string) => void
  onShowByDepartment: (id: string) => void
  onShowByAssignee: (id: string) => void
  onShowByInitiator: (id: string) => void
  onExportData: (format: string) => void
}

type Popover = 'school' | 'department' | 'assignee' | 'initiator' | null

const POPOVER_CONFIG = [
  { key: 'school'     as const, label: 'Filter by School',     icon: 'fas fa-university', placeholder: 'Enter school ID or name…' },
  { key: 'department' as const, label: 'Filter by Department', icon: 'fas fa-building',   placeholder: 'Enter department ID or name…' },
  { key: 'assignee'   as const, label: 'Filter by Assignee',   icon: 'fas fa-user-tag',   placeholder: 'Enter assignee ID or name…' },
  { key: 'initiator'  as const, label: 'Filter by Initiator',  icon: 'fas fa-user-edit',  placeholder: 'Enter initiator ID or name…' },
]

export function TrackingHeader({
  currentViewMode, trackingStats, trackingCount, onRefresh, onInitiateCurriculum, onViewMode,
  onShowMyInitiated, onShowMyAssigned, onShowBySchool, onShowByDepartment,
  onShowByAssignee, onShowByInitiator, onExportData,
}: Props) {
  const [showExport, setShowExport]   = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [popover, setPopover]         = useState<Popover>(null)
  const [popoverVal, setPopoverVal]   = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (popover) inputRef.current?.focus() }, [popover])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPopover(null); setPopoverVal(''); setShowFilters(false); setShowExport(false) }
    }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  const commit = () => {
    const v = popoverVal.trim()
    if (!v || !popover) return
    const fn = { school: onShowBySchool, department: onShowByDepartment, assignee: onShowByAssignee, initiator: onShowByInitiator }[popover]
    fn(v); setPopover(null); setPopoverVal('')
  }

  const current = POPOVER_CONFIG.find((p) => p.key === popover)
  const viewBtn = (mode: TrackingViewMode, icon: string, label: string) => (
    <button key={mode} onClick={() => onViewMode(mode)}
      className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all',
        currentViewMode === mode ? 'bg-white text-must-blue shadow-sm' : 'text-gray-600 hover:bg-white/60 hover:text-gray-800')}>
      <i className={icon} aria-hidden="true" />{label}
    </button>
  )

  return (
    <>
      {/* Header section with title and controls */}
      <div className="mb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-route text-must-green" aria-hidden="true" />
              Curriculum Tracking
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Monitor curriculum progress through all approval stages</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
              <i className="fas fa-eye text-must-green/70" aria-hidden="true" />
              <span>Current View: <strong className="text-gray-800">{VIEW_MODE_NAMES[currentViewMode] ?? currentViewMode}</strong></span>
              {trackingCount !== undefined ? <span>• {trackingCount} tracking{trackingCount !== 1 ? 's' : ''}</span> : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
          {/* View toggle */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {viewBtn('workflow', 'fas fa-sitemap', 'Workflow')}
            {viewBtn('table', 'fas fa-table', 'Table')}
          </div>

          {/* Personal views */}
          <button onClick={onShowMyInitiated}
            className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all',
              currentViewMode === 'my-initiated' ? 'bg-must-green text-white border-must-green' : 'bg-white text-gray-600 border-gray-200 hover:border-must-green hover:text-must-green')}>
            <i className="fas fa-user-plus" aria-hidden="true" /> My Initiated
          </button>
          <button onClick={onShowMyAssigned}
            className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all',
              currentViewMode === 'my-assigned' ? 'bg-must-green text-white border-must-green' : 'bg-white text-gray-600 border-gray-200 hover:border-must-green hover:text-must-green')}>
            <i className="fas fa-user-check" aria-hidden="true" /> My Assigned
          </button>

          {/* Filter views dropdown */}
          <div className="relative">
            <button onClick={() => { setShowFilters(!showFilters); setShowExport(false) }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-must-blue text-white hover:bg-must-blue-dark transition-all"
              aria-expanded={showFilters}>
              <i className="fas fa-filter" aria-hidden="true" /> Filter Views
              <i className={cn('fas text-[10px]', showFilters ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" />
            </button>
            {showFilters && (
              <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-strong z-20 min-w-[190px] overflow-hidden">
                {POPOVER_CONFIG.map(({ key, label, icon }) => (
                  <button key={key} onClick={() => { setPopover(key); setShowFilters(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-must-green/5 hover:text-must-green transition-colors text-left font-medium">
                    <i className={cn(icon, 'w-4 text-gray-400')} aria-hidden="true" />{label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Inline filter popover */}
          {popover && current && (
            <div className="flex items-center gap-2 px-3 py-2 bg-must-green/5 border border-must-green/30 rounded-xl animate-fade-in">
              <i className={cn(current.icon, 'text-must-green text-xs')} aria-hidden="true" />
              <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">{current.label}:</span>
              <input ref={inputRef} type="text" value={popoverVal} onChange={(e) => setPopoverVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setPopover(null); setPopoverVal('') } }}
                placeholder={current.placeholder}
                className="w-44 px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-must-green" />
              <button onClick={commit} disabled={!popoverVal.trim()}
                className="px-2.5 py-1 text-xs font-semibold text-white bg-must-green rounded-lg disabled:opacity-50 hover:-translate-y-px transition-all">Apply</button>
              <button onClick={() => { setPopover(null); setPopoverVal('') }}
                className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <i className="fas fa-times text-xs" aria-hidden="true" />
              </button>
            </div>
          )}

          <button onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:border-must-green hover:text-must-green transition-all">
            <i className="fas fa-sync-alt" aria-hidden="true" /> Refresh
          </button>

          {/* Export dropdown */}
          <div className="relative">
            <button onClick={() => { setShowExport(!showExport); setShowFilters(false) }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:border-must-green hover:text-must-green transition-all"
              aria-expanded={showExport}>
              <i className="fas fa-download" aria-hidden="true" /> Export
              <i className={cn('fas text-[10px]', showExport ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" />
            </button>
            {showExport && (
              <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-strong z-20 min-w-[160px] overflow-hidden">
                {[
                  { label: 'Export JSON',  icon: 'fas fa-file-code', format: 'json' },
                  { label: 'Export CSV',   icon: 'fas fa-file-csv',  format: 'csv' },
                  { label: 'Print Report', icon: 'fas fa-print',     format: 'print' },
                ].map(({ label, icon, format }) => (
                  <button key={format} onClick={() => { if (format === 'print' && typeof window !== 'undefined') window.print(); else onExportData(format); setShowExport(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-must-green/5 hover:text-must-green transition-colors text-left font-medium">
                    <i className={cn(icon, 'w-4 text-gray-400')} aria-hidden="true" />{label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={onInitiateCurriculum}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-must-green via-must-green-dark to-must-teal shadow-sm hover:-translate-y-px hover:shadow-green transition-all">
            <i className="fas fa-plus" aria-hidden="true" /> New Tracking
          </button>
        </div>
        </div>
      </div>

      {(showExport || showFilters) && (
        <div className="fixed inset-0 z-10" aria-hidden="true"
          onClick={() => { setShowExport(false); setShowFilters(false) }} />
      )}
    </>
  )
}
