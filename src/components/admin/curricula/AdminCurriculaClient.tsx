'use client'

import React, { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { useGetAllCurricula, useUpdateCurriculum, useDeleteCurriculum } from '@/hooks/api/curricula'
import { useGetAllSchools } from '@/hooks/api/schools'
import { queryKeys } from '@/utils/queryKeys'

import type { CurriculumDto } from '@/types/curriculum-dto'
import type { SchoolDto } from '@/types/school'
import type { Curriculum, School, CurriculumStats, PaginationState, Notification } from '@/types/curricula'

import { PageHeader } from './PageHeader'
import { StatsGrid } from './StatsGrid'
import { FilterSection } from './FilterSection'
import { NotificationBanner } from './NotificationBanner'
import { CurriculumTable } from './table/CurriculumTable'
import { CurriculumModal } from './modals/CurriculumModal'
import { DeleteConfirmationModal } from './modals/DeleteConfirmationModal'
import { useCurriculaFilters } from './hooks/useCurriculaFilters'

// ── Adapters ───────────────────────────────────────────────────────────────

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

function schoolDtoToSchool(dto: SchoolDto): School {
  return { id: dto.id, name: dto.name, code: dto.code }
}

// ── Constants ──────────────────────────────────────────────────────────────

const DEFAULT_PAGINATION: PaginationState = {
  currentPage: 1,
  pageSize: 20,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
}

// ── Skeleton ───────────────────────────────────────────────────────────────

function AdminCurriculaSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-14 bg-gray-200 rounded-xl w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-full" />
      <div className="h-96 bg-gray-200 rounded-xl w-full" />
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────

export function AdminCurriculaClient() {
  const router = useRouter()
  const queryClient = useQueryClient()

  // ── Server state ─────────────────────────────────────────────────────
  // size: 500 loads all curricula so breakdown counts are accurate across the full dataset
  const { data: curriculaPage, isPending: listPending } = useGetAllCurricula({ page: 0, size: 500 })
  const { data: schoolDtos } = useGetAllSchools()

  const updateMutation = useUpdateCurriculum()
  const deleteMutation = useDeleteCurriculum()

  // ── Derived data ──────────────────────────────────────────────────────
  const curricula = React.useMemo(
    () => (curriculaPage?.curriculums ?? []).map(dtoToCurriculum),
    [curriculaPage],
  )

  const schools: School[] = React.useMemo(
    () => (schoolDtos ?? []).map(schoolDtoToSchool),
    [schoolDtos],
  )

  // Total from backend pagination metadata (always the real system total).
  // Breakdown derived from the fully loaded list (accurate when size ≥ totalElements).
  const stats: CurriculumStats = React.useMemo(
    () => ({
      total:       curriculaPage?.totalElements                          ?? 0,
      approved:    curricula.filter((c) => c.status === 'approved').length,
      pending:     curricula.filter((c) => c.status === 'pending').length,
      rejected:    curricula.filter((c) => c.status === 'rejected').length,
      draft:       0,
      underReview: curricula.filter((c) => c.status === 'under_review').length,
    }),
    [curriculaPage?.totalElements, curricula],
  )

  // ── UI state ──────────────────────────────────────────────────────────
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGINATION)
  const [isSearching, setIsSearching] = useState(false)
  const [notification, setNotification] = useState<Notification | null>(null)
  const [modalState, setModalState] = useState<{ isOpen: boolean; curriculum: Curriculum | null }>(
    { isOpen: false, curriculum: null },
  )
  const [deleteState, setDeleteState] = useState<{ isOpen: boolean; curriculum: Curriculum | null }>(
    { isOpen: false, curriculum: null },
  )

  const { filters, searchQuery, setSearchQuery, updateFilter, resetFilters, hasActiveFilters } =
    useCurriculaFilters()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification(null), 4000)
  }, [])

  // ── Client-side filters + pagination ─────────────────────────────────
  const filteredCurricula = React.useMemo(() => {
    let result = [...curricula]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.code?.toLowerCase().includes(q) ||
          c.department?.toLowerCase().includes(q),
      )
    }
    if (filters.statusFilter !== 'all')
      result = result.filter((c) => c.status === filters.statusFilter)
    if (filters.selectedSchool && filters.selectedSchool !== 'all')
      result = result.filter((c) => String(c.schoolId) === String(filters.selectedSchool))
    if (filters.sortBy === 'lastModified' || filters.sortBy === 'newest')
      result.sort((a, b) => new Date(b.lastModified ?? 0).getTime() - new Date(a.lastModified ?? 0).getTime())
    else if (filters.sortBy === 'oldest')
      result.sort((a, b) => new Date(a.lastModified ?? 0).getTime() - new Date(b.lastModified ?? 0).getTime())
    else if (filters.sortBy === 'title')
      result.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
    return result
  }, [curricula, searchQuery, filters])

  const paginatedCurricula = React.useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.pageSize
    return filteredCurricula.slice(start, start + pagination.pageSize)
  }, [filteredCurricula, pagination.currentPage, pagination.pageSize])

  React.useEffect(() => {
    const total = filteredCurricula.length
    const totalPages = Math.ceil(total / pagination.pageSize)
    setPagination((prev) => ({
      ...prev,
      totalElements: total,
      totalPages: Math.max(1, totalPages),
      hasNext: prev.currentPage < totalPages,
      hasPrevious: prev.currentPage > 1,
      currentPage: Math.min(prev.currentPage, Math.max(1, totalPages)),
    }))
  }, [filteredCurricula.length, pagination.pageSize])

  // ── Handlers ──────────────────────────────────────────────────────────
  const handlePageChange = (page: number) => setPagination((prev) => ({ ...prev, currentPage: page }))
  const handlePageSizeChange = (size: number) =>
    setPagination((prev) => ({ ...prev, pageSize: size, currentPage: 1 }))

  const handleSearchChange = (query: string) => {
    setIsSearching(true)
    setSearchQuery(query)
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => setIsSearching(false), 300)
  }

  const handleAddNew = () => router.push('/admin/admin-all-curricula/create')
  const handleEdit = (curriculum: Curriculum) => setModalState({ isOpen: true, curriculum })
  const handleDelete = (curriculum: Curriculum) => setDeleteState({ isOpen: true, curriculum })

  const handleApprove = (curriculum: Curriculum) => {
    showNotification(
      `Status changes for "${curriculum.title}" are managed via Curriculum Tracking.`,
      'error',
    )
  }

  const handleReject = (curriculum: Curriculum) => {
    showNotification(
      `Status changes for "${curriculum.title}" are managed via Curriculum Tracking.`,
      'error',
    )
  }

  const handleSave = (data: Partial<Curriculum>) => {
    const curr = modalState.curriculum
    if (!curr) return
    updateMutation.mutate(
      {
        id: Number(curr.id),
        data: {
          name:         data.title        ?? curr.title,
          code:         data.code         ?? curr.code,
          schoolId:     Number(data.schoolId   ?? curr.schoolId),
          departmentId: Number(curr.departmentId ?? 0),
        },
      },
      {
        onSuccess: () => {
          showNotification(`"${data.title ?? curr.title}" has been updated.`, 'success')
          setModalState({ isOpen: false, curriculum: null })
        },
        onError: () => showNotification('Failed to save curriculum. Please try again.', 'error'),
      },
    )
  }

  const handleConfirmDelete = () => {
    const curr = deleteState.curriculum
    if (!curr) return
    deleteMutation.mutate(
      { id: Number(curr.id) },
      {
        onSuccess: () => {
          showNotification(`"${curr.title}" has been deleted.`, 'success')
          setDeleteState({ isOpen: false, curriculum: null })
        },
        onError: () => showNotification('Failed to delete curriculum. Please try again.', 'error'),
      },
    )
  }

  const handleRefresh = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.curricula.all })

  // ── Skeleton gate ─────────────────────────────────────────────────────
  if (listPending && !curriculaPage) return <AdminCurriculaSkeleton />

  return (
    <div className="space-y-6">
      {notification && (
        <NotificationBanner notification={notification} onClose={() => setNotification(null)} />
      )}

      <PageHeader onAddNew={handleAddNew} />

      <StatsGrid stats={stats} />

      <FilterSection
        searchTerm={searchQuery}
        setSearchTerm={handleSearchChange}
        isSearching={isSearching}
        statusFilter={filters.statusFilter}
        setStatusFilter={(val) => updateFilter('statusFilter', val)}
        selectedSchool={filters.selectedSchool}
        setSelectedSchool={(val) => updateFilter('selectedSchool', val)}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        schools={schools}
      />

      <CurriculumTable
        curricula={paginatedCurricula}
        isLoading={false}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        totalElements={pagination.totalElements}
        totalPages={pagination.totalPages}
        hasNext={pagination.hasNext}
        hasPrevious={pagination.hasPrevious}
        onPageChange={handlePageChange}
        onPreviousPage={() => handlePageChange(pagination.currentPage - 1)}
        onNextPage={() => handlePageChange(pagination.currentPage + 1)}
        onPageSizeChange={handlePageSizeChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onApprove={handleApprove}
        onReject={handleReject}
        getSchoolName={(id) => schools.find((s) => String(s.id) === String(id))?.name ?? 'Unknown'}
        getProgramName={() => ''}
        onRefresh={handleRefresh}
      />

      <CurriculumModal
        isOpen={modalState.isOpen}
        isEdit
        curriculum={modalState.curriculum}
        schools={schools}
        programs={[]}
        isSaving={updateMutation.isPending}
        onSave={handleSave}
        onClose={() => setModalState({ isOpen: false, curriculum: null })}
      />

      <DeleteConfirmationModal
        curriculum={deleteState.curriculum}
        isOpen={deleteState.isOpen}
        isDeleting={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteState({ isOpen: false, curriculum: null })}
      />
    </div>
  )
}
