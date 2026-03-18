import { useState, useCallback } from 'react'
import type {
  CurriculumTracking,
  TrackingFiltersState,
  TrackingModalState,
  TrackingNotification,
  TrackingPaginationState,
  TrackingStatsData,
  TrackingViewMode,
} from '@/types/tracking'
import { getUniqueValues } from '@/lib/tracking/utils'

const DEFAULT_FILTERS: TrackingFiltersState = {
  search: '', school: '', department: '', stage: '', status: '',
  schoolId: '', departmentId: '', assigneeId: '', initiatorId: '',
}

const DEFAULT_MODALS: TrackingModalState = {
  stageDetails: false, documentUpload: false, documentViewer: false,
  notes: false, initiateCurriculum: false, editTracking: false,
  assignTracking: false, statusManagement: false,
}

const DEFAULT_PAGINATION: TrackingPaginationState = {
  currentPage: 1, pageSize: 20, totalElements: 0, totalPages: 0,
}

const DEFAULT_STATS: TrackingStatsData = {
  total: 0, inProgress: 0, onHold: 0, completed: 0, overdue: 0,
  myInitiated: 0, myAssigned: 0, byStatus: {}, byStage: {}, byPriority: {},
}

export function useTrackingPage() {
  const [isLoading, setIsLoading]             = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [error, setError]                     = useState<string | null>(null)
  const [viewMode, setViewMode]               = useState<TrackingViewMode>('workflow')
  const [curricula, setCurricula]             = useState<CurriculumTracking[]>([])
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumTracking | null>(null)
  const [filters, setFilters]                 = useState<TrackingFiltersState>(DEFAULT_FILTERS)
  const [modals, setModals]                   = useState<TrackingModalState>(DEFAULT_MODALS)
  const [notification, setNotification]       = useState<TrackingNotification>({ show: false, message: '', type: 'success' })
  const [pagination, setPagination]           = useState<TrackingPaginationState>(DEFAULT_PAGINATION)
  const [statsData, setStatsData]             = useState<TrackingStatsData>(DEFAULT_STATS)
  const [currentDataSource, setCurrentDataSource] = useState('all')
  const [currentIdentifier, setCurrentIdentifier] = useState<string | null>(null)

  const showNotification = useCallback((message: string, type: TrackingNotification['type'] = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification((p) => ({ ...p, show: false })), 4000)
  }, [])

  const hideNotification = useCallback(() => setNotification((p) => ({ ...p, show: false })), [])

  const openModal = useCallback((key: keyof TrackingModalState, curriculum?: CurriculumTracking) => {
    if (curriculum) setSelectedCurriculum(curriculum)
    setModals((p) => ({ ...p, [key]: true }))
  }, [])

  const closeModal = useCallback((key: keyof TrackingModalState) => {
    setModals((p) => ({ ...p, [key]: false }))
  }, [])

  const updateFilter = useCallback((key: keyof TrackingFiltersState, value: string) => {
    setFilters((p) => ({ ...p, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const filteredCurricula = curricula.filter((c) => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (
        !c.title?.toLowerCase().includes(q) &&
        !c.trackingId?.toLowerCase().includes(q) &&
        !c.school?.toLowerCase().includes(q) &&
        !c.department?.toLowerCase().includes(q)
      ) return false
    }
    if (filters.school     && c.school !== filters.school)         return false
    if (filters.department && c.department !== filters.department) return false
    if (filters.stage      && c.currentStage !== filters.stage)    return false
    if (filters.status     && c.status !== filters.status)         return false
    return true
  })

  const filterSchools     = getUniqueValues(curricula, 'school')
  const filterDepartments = getUniqueValues(curricula, 'department')
  const hasActiveFilters  = Object.values(filters).some(Boolean)

  return {
    isLoading, setIsLoading,
    isActionLoading, setIsActionLoading,
    error, setError,
    viewMode, setViewMode,
    curricula, setCurricula,
    selectedCurriculum, setSelectedCurriculum,
    filters, modals, notification, pagination, setPagination,
    statsData, setStatsData,
    currentDataSource, setCurrentDataSource,
    currentIdentifier, setCurrentIdentifier,
    filteredCurricula, filterSchools, filterDepartments, hasActiveFilters,
    showNotification, hideNotification,
    openModal, closeModal,
    updateFilter, clearFilters,
  }
}
