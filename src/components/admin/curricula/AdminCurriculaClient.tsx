'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import type {
  Curriculum,
  School,
  Program,
  CurriculumStats,
  PaginationState,
  Notification,
} from '@/types/curricula'
import { PageHeader } from './PageHeader'
import { StatsGrid } from './StatsGrid'
import { FilterSection } from './FilterSection'
import { NotificationBanner } from './NotificationBanner'
import { ExpiryAlert } from './ExpiryAlert'
import { CurriculumTable } from './table/CurriculumTable'
import { SchoolsView } from './schools/SchoolsView'
import { CurriculumModal } from './modals/CurriculumModal'
import { DeleteConfirmationModal } from './modals/DeleteConfirmationModal'
import { useSchoolsData } from './hooks/useSchoolsData'
import { useCurriculaFilters } from './hooks/useCurriculaFilters'

interface AdminCurriculaClientProps {
  initialCurricula: Curriculum[]
  initialSchools: School[]
  initialPrograms: Program[]
  initialStats: CurriculumStats
}

const DEFAULT_PAGINATION: PaginationState = {
  currentPage: 1,
  pageSize: 20,
  totalElements: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
}

export function AdminCurriculaClient({
  initialCurricula,
  initialSchools,
  initialPrograms,
  initialStats,
}: AdminCurriculaClientProps) {
  const [curricula, setCurricula] = useState<Curriculum[]>(initialCurricula)
  const [schools] = useState<School[]>(initialSchools)
  const [programs] = useState<Program[]>(initialPrograms)
  const [stats, setStats] = useState<CurriculumStats>(initialStats)
  const [pagination, setPagination] = useState<PaginationState>({
    ...DEFAULT_PAGINATION,
    totalElements: initialCurricula.length,
    totalPages: Math.ceil(initialCurricula.length / DEFAULT_PAGINATION.pageSize),
  })

  const [viewMode, setViewMode] = useState<'schools' | 'table'>('schools')
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [notification, setNotification] = useState<Notification | null>(null)
  const [showExpiryAlert, setShowExpiryAlert] = useState(false)
  const [expiryCount, setExpiryCount] = useState(0)

  const [modalState, setModalState] = useState<{
    isOpen: boolean
    isEdit: boolean
    curriculum: Curriculum | null
  }>({ isOpen: false, isEdit: false, curriculum: null })

  const [deleteState, setDeleteState] = useState<{
    isOpen: boolean
    curriculum: Curriculum | null
  }>({ isOpen: false, curriculum: null })

  const { filters, searchQuery, setSearchQuery, updateFilter, resetFilters, hasActiveFilters } =
    useCurriculaFilters()

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const schoolsData = useSchoolsData(curricula, schools, programs)

  const showNotification = useCallback((message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification(null), 4000)
  }, [])

  const getSchoolName = useCallback(
    (schoolId: string | number) =>
      schools.find((s) => String(s.id) === String(schoolId))?.name ?? 'Unknown School',
    [schools]
  )

  const getProgramName = useCallback(
    (programId: string) =>
      programs.find((p) => String(p.id) === String(programId))?.name ?? 'Unknown Program',
    [programs]
  )

  const filteredCurricula = React.useMemo(() => {
    let result = [...curricula]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.code?.toLowerCase().includes(q) ||
          c.department?.toLowerCase().includes(q)
      )
    }

    if (filters.statusFilter !== 'all') {
      result = result.filter((c) => c.status === filters.statusFilter)
    }

    if (filters.selectedSchool && filters.selectedSchool !== 'all') {
      result = result.filter((c) => String(c.schoolId) === String(filters.selectedSchool))
    }

    if (filters.selectedProgram && filters.selectedProgram !== 'all') {
      result = result.filter((c) => String(c.programId) === String(filters.selectedProgram))
    }

    if (filters.selectedDepartment && filters.selectedDepartment !== 'all') {
      result = result.filter((c) =>
        c.department?.toLowerCase().includes(filters.selectedDepartment.toLowerCase())
      )
    }

    if (filters.sortBy === 'lastModified' || filters.sortBy === 'newest') {
      result.sort(
        (a, b) =>
          new Date(b.lastModified ?? 0).getTime() - new Date(a.lastModified ?? 0).getTime()
      )
    } else if (filters.sortBy === 'oldest') {
      result.sort(
        (a, b) =>
          new Date(a.lastModified ?? 0).getTime() - new Date(b.lastModified ?? 0).getTime()
      )
    } else if (filters.sortBy === 'title') {
      result.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
    } else if (filters.sortBy === 'status') {
      result.sort((a, b) => (a.status ?? '').localeCompare(b.status ?? ''))
    }

    return result
  }, [curricula, searchQuery, filters])

  const paginatedCurricula = React.useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.pageSize
    return filteredCurricula.slice(start, start + pagination.pageSize)
  }, [filteredCurricula, pagination.currentPage, pagination.pageSize])

  useEffect(() => {
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

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  const handlePageSizeChange = (size: number) => {
    setPagination((prev) => ({ ...prev, pageSize: size, currentPage: 1 }))
  }

  const handleSearchChange = (query: string) => {
    setIsSearching(true)
    setSearchQuery(query)
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => setIsSearching(false), 300)
  }

  const handleAddNew = () => {
    setModalState({ isOpen: true, isEdit: false, curriculum: null })
  }

  const handleEdit = (curriculum: Curriculum) => {
    setModalState({ isOpen: true, isEdit: true, curriculum })
  }

  const handleDelete = (curriculum: Curriculum) => {
    setDeleteState({ isOpen: true, curriculum })
  }

  const handleApprove = async (curriculum: Curriculum) => {
    setIsLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 800))
      setCurricula((prev) =>
        prev.map((c) =>
          String(c.id) === String(curriculum.id) ? { ...c, status: 'approved' as const } : c
        )
      )
      setStats((prev) => ({
        ...prev,
        approved: (prev.approved ?? 0) + 1,
        pending: Math.max(0, (prev.pending ?? 0) - 1),
      }))
      showNotification(`"${curriculum.title}" has been approved.`, 'success')
    } catch {
      showNotification('Failed to approve curriculum. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async (curriculum: Curriculum) => {
    setIsLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 800))
      setCurricula((prev) =>
        prev.map((c) =>
          String(c.id) === String(curriculum.id) ? { ...c, status: 'rejected' as const } : c
        )
      )
      setStats((prev) => ({
        ...prev,
        rejected: (prev.rejected ?? 0) + 1,
        pending: Math.max(0, (prev.pending ?? 0) - 1),
      }))
      showNotification(`"${curriculum.title}" has been rejected.`, 'success')
    } catch {
      showNotification('Failed to reject curriculum. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (data: Partial<Curriculum>) => {
    setIsSaving(true)
    try {
      await new Promise((res) => setTimeout(res, 1000))
      if (modalState.isEdit && modalState.curriculum) {
        const updated: Curriculum = {
          ...modalState.curriculum,
          ...data,
          lastModified: new Date().toISOString(),
        }
        setCurricula((prev) =>
          prev.map((c) => (String(c.id) === String(updated.id) ? updated : c))
        )
        showNotification(`"${updated.title}" has been updated.`, 'success')
      } else {
        const newCurriculum: Curriculum = {
          id: `temp-${Date.now()}`,
          code: data.code ?? '',
          department: data.department ?? '',
          ...data,
          lastModified: new Date().toISOString(),
          status: data.status ?? 'draft',
          title: data.title ?? 'Untitled Curriculum',
          schoolId: data.schoolId ?? '',
          programId: data.programId ?? '',
        }
        setCurricula((prev) => [newCurriculum, ...prev])
        setStats((prev) => ({ ...prev, total: (prev.total ?? 0) + 1 }))
        showNotification(`"${newCurriculum.title}" has been created.`, 'success')
      }
      setModalState({ isOpen: false, isEdit: false, curriculum: null })
    } catch {
      showNotification('Failed to save curriculum. Please try again.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteState.curriculum) return
    setIsDeleting(true)
    try {
      await new Promise((res) => setTimeout(res, 800))
      const deleted = deleteState.curriculum
      setCurricula((prev) => prev.filter((c) => String(c.id) !== String(deleted.id)))
      setStats((prev) => ({ ...prev, total: Math.max(0, (prev.total ?? 0) - 1) }))
      showNotification(`"${deleted.title}" has been deleted.`, 'success')
      setDeleteState({ isOpen: false, curriculum: null })
    } catch {
      showNotification('Failed to delete curriculum. Please try again.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  const computedStats: CurriculumStats = React.useMemo(() => {
    return {
      total: curricula.length,
      approved: curricula.filter((c) => c.status === 'approved').length,
      pending: curricula.filter((c) => c.status === 'pending').length,
      rejected: curricula.filter((c) => c.status === 'rejected').length,
      draft: curricula.filter((c) => c.status === 'draft').length,
      underReview: curricula.filter((c) => c.status === 'under_review').length,
    }
  }, [curricula])

  return (
    <div className="space-y-6">
      {notification && (
        <NotificationBanner
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}

      {showExpiryAlert && expiryCount > 0 && (
        <ExpiryAlert
          count={expiryCount}
          onView={() => {
            updateFilter('statusFilter', 'approved')
            setViewMode('table')
          }}
          onDismiss={() => setShowExpiryAlert(false)}
        />
      )}

      <PageHeader onAddNew={handleAddNew} />

      <StatsGrid stats={computedStats} />

      <FilterSection
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchTerm={searchQuery}
        setSearchTerm={handleSearchChange}
        isSearching={isSearching}
        statusFilter={filters.statusFilter}
        setStatusFilter={(val) => updateFilter('statusFilter', val)}
        selectedSchool={filters.selectedSchool}
        setSelectedSchool={(val) => updateFilter('selectedSchool', val)}
        selectedProgram={filters.selectedProgram}
        setSelectedProgram={(val) => updateFilter('selectedProgram', val)}
        selectedDepartment={filters.selectedDepartment}
        setSelectedDepartment={(val) => updateFilter('selectedDepartment', val)}
        sortBy={filters.sortBy}
        setSortBy={(val) => updateFilter('sortBy', val)}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        schools={schools}
        programs={programs}
        showAdvancedFilters={viewMode === 'table'}
      />

      <div className="mt-6">
          {viewMode === 'table' ? (
            <CurriculumTable
              curricula={paginatedCurricula}
              isLoading={isLoading}
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
              getSchoolName={getSchoolName}
              getProgramName={getProgramName}
              onRefresh={() => {}}
            />
          ) : (
            <SchoolsView
              schoolsData={schoolsData}
              allCurricula={filteredCurricula}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
      </div>

      <CurriculumModal
        isOpen={modalState.isOpen}
        isEdit={modalState.isEdit}
        curriculum={modalState.curriculum}
        schools={schools}
        programs={programs}
        isSaving={isSaving}
        onSave={handleSave}
        onClose={() => setModalState({ isOpen: false, isEdit: false, curriculum: null })}
      />

      <DeleteConfirmationModal
        curriculum={deleteState.curriculum}
        isOpen={deleteState.isOpen}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteState({ isOpen: false, curriculum: null })}
      />
    </div>
  )
}