'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { useGetCurriculumById } from '@/hooks/api/curricula'
import type { CurriculumDto } from '@/types/curriculum-dto'
import type { Curriculum } from '@/types/curricula'
import { CurriculumDetailClient } from './CurriculumDetailClient'

// ── Adapter ────────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, Curriculum['status']> = {
  PENDING:      'pending',
  APPROVED:     'approved',
  REJECTED:     'rejected',
  UNDER_REVIEW: 'under_review',
}

function dtoToCurriculum(dto: CurriculumDto): Curriculum {
  return {
    id:               String(dto.id),
    title:            dto.name,
    code:             dto.code,
    status:           STATUS_MAP[dto.status] ?? 'pending',
    schoolId:         dto.schoolId,
    schoolName:       dto.schoolName,
    programId:        '',
    department:       dto.departmentName,
    departmentId:     dto.departmentId,
    durationSemesters: dto.durationSemesters ?? undefined,
    effectiveDate:    dto.effectiveDate ?? undefined,
    expiryDate:       dto.expiryDate ?? undefined,
    createdDate:      dto.createdAt,
    lastModified:     dto.updatedAt,
  }
}

// ── Skeleton ───────────────────────────────────────────────────────────────

function CurriculumDetailSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-5 w-36 bg-gray-200 rounded-lg" />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-48 bg-gray-200 rounded-2xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
        </div>
        <div className="space-y-4">
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export function CurriculumDetailPageClient() {
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)

  const { data, isPending, error } = useGetCurriculumById(numericId)

  if (isPending && !data) return <CurriculumDetailSkeleton />

  if (error || !data) {
    return (
      <div className="p-6 space-y-4">
        <Link
          href="/admin/admin-all-curricula"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Curricula
        </Link>
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <i className="fas fa-book-open text-4xl text-gray-300 mb-4 block" aria-hidden="true" />
          <p className="text-base font-semibold text-gray-700">Curriculum not found</p>
          <p className="text-sm text-gray-400 mt-1">
            This curriculum may have been removed or does not exist.
          </p>
          <Link
            href="/admin/admin-all-curricula"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-semibold text-white bg-must-green rounded-lg hover:bg-must-green-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to list
          </Link>
        </div>
      </div>
    )
  }

  return <CurriculumDetailClient curriculum={dtoToCurriculum(data)} />
}
