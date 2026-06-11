'use client'

import { Suspense, useState, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Search, X, Building2, BookOpen, Clock, CalendarCheck, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGetAllSchools } from '@/hooks/api/schools'
import { useGetAllCurricula, useGetCurriculaBySchool } from '@/hooks/api/curricula'
import type { BackendCurriculumStatus, CurriculumDto } from '@/types/curriculum-dto'

const STATUS_CONFIG: Record<BackendCurriculumStatus, { pill: string; label: string }> = {
  APPROVED:     { pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Approved' },
  PENDING:      { pill: 'bg-amber-100 text-amber-700 border-amber-200',       label: 'Pending' },
  REJECTED:     { pill: 'bg-red-100 text-red-700 border-red-200',             label: 'Rejected' },
  UNDER_REVIEW: { pill: 'bg-blue-100 text-blue-700 border-blue-200',          label: 'Under Review' },
}

const PAGE_SIZE = 20

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

// ── Detail modal ──────────────────────────────────────────────────────────────

function InfoCard({ icon, label, value, accent = 'green' }: {
  icon: React.ReactNode; label: string; value: string
  accent?: 'green' | 'gold' | 'blue' | 'purple'
}) {
  const bg: Record<string, string> = {
    green:  'bg-emerald-50 text-emerald-600',
    gold:   'bg-amber-50 text-amber-600',
    blue:   'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  }
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-start gap-3">
      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', bg[accent])}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  )
}

function CurriculumModal({ curriculum, onClose }: { curriculum: CurriculumDto; onClose: () => void }) {
  const status = STATUS_CONFIG[curriculum.status] ?? {
    pill: 'bg-gray-100 text-gray-600 border-gray-200', label: curriculum.status,
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-must-green to-must-teal px-6 py-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            Curriculum Details
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Curriculum Name</p>
            <p className="text-xl font-bold text-gray-900">{curriculum.name}</p>
            {curriculum.code && <p className="text-xs font-mono text-gray-400 mt-0.5">Code: {curriculum.code}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard icon={<Building2 className="w-5 h-5" />}     label="School"       value={curriculum.schoolName}                         accent="green"  />
            <InfoCard icon={<BookOpen className="w-5 h-5" />}      label="Department"   value={curriculum.departmentName}                     accent="gold"   />
            <InfoCard icon={<Clock className="w-5 h-5" />}         label="Status"       value={status.label}                                  accent="blue"   />
            <InfoCard icon={<CalendarCheck className="w-5 h-5" />} label="Last Updated" value={formatDate(curriculum.updatedAt)}              accent="purple" />
          </div>
          {curriculum.academicLevelName && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1.5">Academic Level</p>
              <p className="text-sm font-bold text-blue-900">{curriculum.academicLevelName}</p>
            </div>
          )}
          {curriculum.durationSemesters && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-sm font-semibold text-gray-900">
                {curriculum.durationSemesters} semester{curriculum.durationSemesters !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Table skeleton ────────────────────────────────────────────────────────────

function TableSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {['Curriculum Name', 'School', 'Department', 'Status', 'Last Updated', ''].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i}>
                <td className="px-5 py-3.5"><div className="h-4 bg-gray-200 rounded w-48" /></td>
                <td className="px-5 py-3.5"><div className="h-4 bg-gray-200 rounded w-32" /></td>
                <td className="px-5 py-3.5"><div className="h-4 bg-gray-200 rounded w-28" /></td>
                <td className="px-5 py-3.5"><div className="h-5 bg-gray-200 rounded-full w-20" /></td>
                <td className="px-5 py-3.5"><div className="h-4 bg-gray-200 rounded w-24" /></td>
                <td className="px-5 py-3.5"><div className="h-7 bg-gray-200 rounded w-14" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── School select ─────────────────────────────────────────────────────────────

function SchoolSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { data: schools, isPending } = useGetAllSchools()
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={isPending && !schools}
      className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-must-green bg-white text-gray-700 disabled:opacity-60"
    >
      <option value="">All Schools</option>
      {(schools ?? []).map((s) => (
        <option key={s.id} value={String(s.id)}>{s.name}</option>
      ))}
    </select>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

function CurriculaContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const schoolId = searchParams.get('schoolId') ?? ''
  const status   = searchParams.get('status') ?? ''
  const page     = Number(searchParams.get('page') ?? '0')

  // Local text + status filters applied client-side on current page
  const [searchInput, setSearchInput] = useState('')
  const [selected, setSelected]       = useState<CurriculumDto | null>(null)

  const setParam = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === '') params.delete(k)
        else params.set(k, v)
      })
      params.delete('page')
      router.replace(`/user/curricula?${params.toString()}`)
    },
    [router, searchParams],
  )

  // Use school-specific endpoint when a school is selected
  const { data: allData, isPending: allPending } = useGetAllCurricula({ page, size: PAGE_SIZE })
  const { data: schoolData, isPending: schoolPending } = useGetCurriculaBySchool({
    schoolId: schoolId ? Number(schoolId) : 0,
    page,
    size: PAGE_SIZE,
  })

  const rawPage  = schoolId ? schoolData : allData
  const isPending = schoolId ? schoolPending : allPending
  const isCurriculaLoading = isPending && !rawPage

  // Client-side status + text filtering
  const filteredCurricula = useMemo(() => {
    const all = rawPage?.curriculums ?? []
    return all.filter((c) => {
      if (status && c.status !== (status as BackendCurriculumStatus)) return false
      if (searchInput.trim()) {
        const q = searchInput.toLowerCase()
        return (
          c.name.toLowerCase().includes(q) ||
          c.schoolName.toLowerCase().includes(q) ||
          c.departmentName.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [rawPage, status, searchInput])

  const totalPages = rawPage?.totalPages ?? 0
  const totalCount = rawPage?.totalElements ?? 0
  const hasFilters = !!schoolId || !!status || !!searchInput

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Curriculums</h1>
        {!isCurriculaLoading && (
          <p className="text-sm text-gray-500 mt-0.5">
            {hasFilters
              ? `${filteredCurricula.length} of ${totalCount} shown`
              : `${totalCount} total`}
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3 items-center shadow-sm">
        {/* Text search (client-side) */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Filter by name, school or department…"
            className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10 transition-all"
          />
          {searchInput && (
            <button onClick={() => setSearchInput('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => setParam({ status: e.target.value || null })}
          className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-must-green bg-white text-gray-700"
        >
          <option value="">All Statuses</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {/* School filter */}
        <SchoolSelect value={schoolId} onChange={(v) => setParam({ schoolId: v || null })} />

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={() => { setSearchInput(''); router.replace('/user/curricula') }}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg transition-all"
          >
            <X className="w-4 h-4" /> Clear
          </button>
        )}
      </div>

      {/* Empty state */}
      {!isCurriculaLoading && filteredCurricula.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-sm">
          <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-700">No curriculums found</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Try adjusting your search or filters</p>
          {hasFilters && (
            <button
              onClick={() => { setSearchInput(''); router.replace('/user/curricula') }}
              className="px-4 py-2 text-sm font-semibold text-must-green border border-must-green/30 rounded-lg hover:bg-must-green/5 transition-all"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Skeleton */}
      {isCurriculaLoading && <TableSkeleton />}

      {/* Table */}
      {!isCurriculaLoading && filteredCurricula.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {['Curriculum Name', 'School', 'Department', 'Status', 'Last Updated', ''].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCurricula.map((c) => {
                  const s = STATUS_CONFIG[c.status] ?? {
                    pill: 'bg-gray-100 text-gray-600 border-gray-200', label: c.status,
                  }
                  return (
                    <tr key={c.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 max-w-xs">
                        <p className="truncate">{c.name}</p>
                        {c.code && <p className="text-xs font-mono text-gray-400 mt-0.5">{c.code}</p>}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{c.schoolName}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{c.departmentName}</td>
                      <td className="px-5 py-3.5">
                        <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border', s.pill)}>{s.label}</span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{formatDate(c.updatedAt)}</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => setSelected(c)}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-must-green hover:bg-must-green-dark rounded-lg transition-all hover:-translate-y-px hover:shadow-sm"
                        >
                          <i className="fas fa-eye text-[10px]" aria-hidden="true" /> View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            disabled={page === 0}
            onClick={() => setParam({ page: String(page - 1) })}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg disabled:opacity-40 hover:border-must-green hover:text-must-green transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-sm text-gray-500">Page {page + 1} of {totalPages}</span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setParam({ page: String(page + 1) })}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg disabled:opacity-40 hover:border-must-green hover:text-must-green transition-all"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Detail modal */}
      {selected && <CurriculumModal curriculum={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default function CurriculaPage() {
  return (
    <Suspense>
      <CurriculaContent />
    </Suspense>
  )
}
