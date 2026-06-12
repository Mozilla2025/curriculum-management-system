'use client'

import Link from 'next/link'
import {
  ArrowLeft, Building2, BookOpen, LayoutGrid, Clock,
  CalendarCheck, CalendarX, CheckCircle2, XCircle, Hash, Timer,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CurriculumDto, BackendCurriculumStatus } from '@/types/curriculum-dto'

const STATUS_CONFIG: Record<BackendCurriculumStatus, { pill: string; label: string }> = {
  APPROVED:     { pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Approved' },
  PENDING:      { pill: 'bg-amber-100  text-amber-700  border-amber-200',     label: 'Pending' },
  REJECTED:     { pill: 'bg-red-100    text-red-700    border-red-200',       label: 'Rejected' },
  UNDER_REVIEW: { pill: 'bg-blue-100   text-blue-700   border-blue-200',      label: 'Under Review' },
}

function fmt(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function InfoCard({
  icon, label, value, accent = 'green',
}: {
  icon: React.ReactNode; label: string; value: string; accent?: 'green' | 'gold' | 'blue' | 'purple'
}) {
  const bg = {
    green:  'bg-emerald-50 text-emerald-600',
    gold:   'bg-amber-50   text-amber-600',
    blue:   'bg-blue-50    text-blue-600',
    purple: 'bg-purple-50  text-purple-600',
  }[accent]
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', bg)}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  )
}

interface Props {
  curriculum: CurriculumDto
}

export function CurriculumDetailView({ curriculum }: Props) {
  const statusCfg = STATUS_CONFIG[curriculum.status] ?? {
    pill: 'bg-gray-100 text-gray-600 border-gray-200', label: curriculum.status,
  }

  return (
    <div className="max-w-3xl space-y-6 animate-fade-in">

      {/* Back nav */}
      <Link
        href="/user/curricula"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Curriculums
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-must-green to-must-teal px-6 py-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
                {curriculum.schoolName} · {curriculum.departmentName}
              </p>
              <h1 className="text-xl font-bold text-white leading-snug">{curriculum.name}</h1>
              {curriculum.code && (
                <p className="text-emerald-200/80 text-xs font-mono mt-1">{curriculum.code}</p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={cn(
                'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border',
                statusCfg.pill,
              )}>
                {statusCfg.label}
              </span>
              <span className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border',
                curriculum.active
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-red-500/20 text-red-100 border-red-400/30',
              )}>
                {curriculum.active
                  ? <><CheckCircle2 className="w-3 h-3" /> Active</>
                  : <><XCircle className="w-3 h-3" /> Inactive</>}
              </span>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon={<Building2 className="w-5 h-5" />}      label="School"         value={curriculum.schoolName}                           accent="green"  />
          <InfoCard icon={<BookOpen className="w-5 h-5" />}       label="Department"     value={curriculum.departmentName}                       accent="gold"   />
          <InfoCard icon={<LayoutGrid className="w-5 h-5" />}     label="Academic Level" value={curriculum.academicLevelName ?? 'Not specified'}  accent="blue"   />
          <InfoCard icon={<Clock className="w-5 h-5" />}          label="Status"         value={statusCfg.label}                                 accent="purple" />
          {curriculum.durationSemesters && (
            <InfoCard icon={<Timer className="w-5 h-5" />}        label="Duration"       value={`${curriculum.durationSemesters} semester${curriculum.durationSemesters !== 1 ? 's' : ''}`} accent="gold" />
          )}
          {curriculum.code && (
            <InfoCard icon={<Hash className="w-5 h-5" />}         label="Curriculum Code" value={curriculum.code}                                accent="blue"   />
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-must-green" />
          Key Dates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Created',    value: fmt(curriculum.createdAt),    icon: <CalendarCheck className="w-4 h-4" />, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Effective',  value: fmt(curriculum.effectiveDate), icon: <CalendarCheck className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50' },
            { label: 'Expiry',     value: fmt(curriculum.expiryDate),    icon: <CalendarX className="w-4 h-4" />,     color: 'text-amber-600 bg-amber-50' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', color)}>
                {icon}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking workflow placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-must-green" />
          Approval Workflow
        </h2>
        <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-500">Tracking history coming soon</p>
          <p className="text-xs text-gray-400 mt-1">
            Full approval workflow, stage history, and documents will be available here.
          </p>
        </div>
      </div>

    </div>
  )
}

export function CurriculumDetailSkeleton() {
  return (
    <div className="max-w-3xl space-y-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-44" />
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-200 h-32" />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2.5 bg-gray-200 rounded w-16" />
                <div className="h-3.5 bg-gray-200 rounded w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
