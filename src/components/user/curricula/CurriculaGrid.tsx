'use client'

import Link from 'next/link'
import { BookOpen, Building2, GraduationCap, Calendar, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CurriculumDto, BackendCurriculumStatus } from '@/types/curriculum-dto'

const STATUS_CONFIG: Record<BackendCurriculumStatus, { pill: string; label: string }> = {
  APPROVED:     { pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Approved' },
  PENDING:      { pill: 'bg-amber-100 text-amber-700 border-amber-200',       label: 'Pending' },
  REJECTED:     { pill: 'bg-red-100 text-red-700 border-red-200',             label: 'Rejected' },
  UNDER_REVIEW: { pill: 'bg-blue-100 text-blue-700 border-blue-200',          label: 'Under Review' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface CurriculaGridProps {
  curricula: CurriculumDto[]
}

export function CurriculaGrid({ curricula }: CurriculaGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {curricula.map((c) => {
        const status = STATUS_CONFIG[c.status] ?? {
          pill: 'bg-gray-100 text-gray-600 border-gray-200',
          label: c.status,
        }

        return (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md hover:border-must-green/40 transition-all duration-200 group"
          >
            {/* Status + code */}
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                  status.pill,
                )}
              >
                {status.label}
              </span>
              {c.code && (
                <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                  {c.code}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-must-green transition-colors">
              {c.name}
            </h3>

            {/* Meta */}
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                <span className="truncate">{c.schoolName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                <span className="truncate">{c.departmentName}</span>
              </div>
              {c.academicLevelName && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <GraduationCap className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                  <span className="truncate">{c.academicLevelName}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Updated {formatDate(c.updatedAt)}</span>
              </div>
            </div>

            {/* View link */}
            <Link
              href={`/user/curricula/${c.id}`}
              className="mt-1 flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-must-green border border-must-green/30 rounded-lg hover:bg-must-green hover:text-white transition-all"
            >
              View Details
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export function CurriculaGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
            <div className="h-5 w-14 bg-gray-100 rounded" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-2/3" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
          <div className="h-8 bg-gray-100 rounded-lg w-full" />
        </div>
      ))}
    </div>
  )
}
