'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import type { CurriculumTracking, InitiateTrackingRequest, TrackingAction, TrackingStatsData } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { adaptTrackingOverview } from '@/lib/tracking/utils'
import { useTrackingPage } from '@/hooks/tracking/useTrackingPage'
import { useGetAllTrackings }        from '@/hooks/api/tracking'
import { useInitiateTracking }       from '@/hooks/api/tracking'
import { usePerformTrackingAction }  from '@/hooks/api/tracking'
import { queryKeys }                 from '@/utils/queryKeys'

import { TrackingHeader }             from '@/components/admin/curriculum-tracking/header/TrackingHeader'
import { TrackingFilters }            from '@/components/admin/curriculum-tracking/filters/TrackingFilters'
import { CurriculumWorkflowSelector } from '@/components/admin/curriculum-tracking/workflow/CurriculumWorkflowSelector'
import { TrackingNotificationBanner } from '@/components/admin/curriculum-tracking/shared/TrackingNotificationBanner'
import { DocumentViewer }             from '@/components/admin/curriculum-tracking/shared/DocumentViewer'
import { TrackingPageSkeleton }       from '@/components/admin/curriculum-tracking/shared/TrackingSkeletons'
import { DocumentUploadModal }        from '@/components/admin/curriculum-tracking/modals/DocumentUploadModal'
import { NotesModal }                 from '@/components/admin/curriculum-tracking/modals/NotesModal'
import { InitiateCurriculumModal }    from '@/components/admin/curriculum-tracking/modals/InitiateCurriculumModal'
import { EditTrackingModal }          from '@/components/admin/curriculum-tracking/modals/EditTrackingModal'
import { AssignTrackingModal, StatusManagementModal } from '@/components/admin/curriculum-tracking/modals/TrackingManagementModals'
import type { EditFormData }          from '@/components/admin/curriculum-tracking/modals/EditTrackingModal'

// Maps action string from WorkflowStage → backend TrackingAction
const ACTION_MAP: Record<string, TrackingAction> = {
  approve:  'APPROVE',
  reject:   'REJECT',
  sendBack: 'RETURN',
  return:   'RETURN',
  resume:   'REVIEW',
  submit:   'SUBMIT',
  complete: 'COMPLETE',
}

export function CurriculumTrackingPageClient() {
  const router       = useRouter()
  const queryClient  = useQueryClient()

  const {
    isActionLoading, setIsActionLoading,
    viewMode, setViewMode,
    selectedCurriculum, setSelectedCurriculum,
    filters, modals, notification,
    currentDataSource, setCurrentDataSource,
    currentIdentifier, setCurrentIdentifier,
    showNotification, hideNotification,
    openModal, closeModal,
    updateFilter, clearFilters,
  } = useTrackingPage()

  // ── Real data ──────────────────────────────────────────────────────────────
  const { data: trackingPage, isPending } = useGetAllTrackings({ page: 0, size: 50 })
  const { mutateAsync: initiateTracking } = useInitiateTracking()
  const { mutateAsync: performAction }    = usePerformTrackingAction()

  const allCurricula: CurriculumTracking[] = useMemo(
    () => (trackingPage?.trackings ?? []).map(adaptTrackingOverview),
    [trackingPage],
  )

  // Derive stats from real data
  const statsData: TrackingStatsData = useMemo(() => {
    const raw = trackingPage?.trackings ?? []
    return {
      total:       trackingPage?.totalElements ?? 0,
      inProgress:  raw.filter((t) => t.status === 'IN_PROGRESS').length,
      onHold:      raw.filter((t) => t.status === 'RETURNED_FOR_REVISION').length,
      completed:   raw.filter((t) => t.status === 'COMPLETED' || t.status === 'APPROVED').length,
      overdue:     0,
      myInitiated: 0,
      myAssigned:  0,
    }
  }, [trackingPage])

  // Client-side filter (mirrors useTrackingPage logic but applied to real data)
  const filteredCurricula = useMemo(() => {
    return allCurricula.filter((c) => {
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
  }, [allCurricula, filters])

  const filterSchools     = useMemo(() => Array.from(new Set(allCurricula.map((c) => c.school).filter(Boolean))).sort(), [allCurricula])
  const filterDepartments = useMemo(() => Array.from(new Set(allCurricula.map((c) => c.department).filter(Boolean))).sort(), [allCurricula])

  // ── Refresh ────────────────────────────────────────────────────────────────
  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.tracking.all })
    showNotification('Data refreshed', 'success')
  }, [queryClient, showNotification])

  // ── View mode helpers ──────────────────────────────────────────────────────
  const handleShowMyInitiated  = useCallback(() => setViewMode('my-initiated'), [setViewMode])
  const handleShowMyAssigned   = useCallback(() => setViewMode('my-assigned'), [setViewMode])
  const handleShowBySchool     = useCallback((id: string) => { setViewMode('by-school'); setCurrentDataSource('by-school'); setCurrentIdentifier(id) }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])
  const handleShowByDepartment = useCallback((id: string) => { setViewMode('by-department'); setCurrentDataSource('by-department'); setCurrentIdentifier(id) }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])
  const handleShowByAssignee   = useCallback((id: string) => { setViewMode('by-assignee'); setCurrentDataSource('by-assignee'); setCurrentIdentifier(id) }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])
  const handleShowByInitiator  = useCallback((id: string) => { setViewMode('by-initiator'); setCurrentDataSource('by-initiator'); setCurrentIdentifier(id) }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])

  const handleExport = useCallback((format: string) => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(filteredCurricula, null, 2)], { type: 'application/json' })
      const url  = URL.createObjectURL(blob)
      const a    = Object.assign(document.createElement('a'), { href: url, download: 'tracking-export.json' })
      a.click(); URL.revokeObjectURL(url)
    }
    showNotification(`Exported as ${format.toUpperCase()}`, 'success')
  }, [filteredCurricula, showNotification])

  // ── Stage actions (real API) ───────────────────────────────────────────────
  const handleStageAction = useCallback(async (
    id: string | number, _stageKey: string, action: string,
    payload?: { feedback?: string; returnToStage?: string | null },
  ) => {
    const backendAction = ACTION_MAP[action]
    if (!backendAction) { showNotification(`Unknown action: ${action}`, 'error'); return }
    setIsActionLoading(true)
    try {
      await performAction({
        data: { trackingId: Number(id), action: backendAction, notes: payload?.feedback },
      })
      showNotification(`Action "${action}" completed successfully`, 'success')
    } catch {
      showNotification(`Failed to ${action}`, 'error')
    } finally {
      setIsActionLoading(false)
    }
  }, [performAction, setIsActionLoading, showNotification])

  // ── Modal openers ──────────────────────────────────────────────────────────
  const handleViewDetails          = useCallback((c: CurriculumTracking) => router.push(`/admin/admin-curriculum-tracking/${c.id}`), [router])
  const handleOpenDocumentUpload   = useCallback((c: CurriculumTracking, stageKey: string) => { setSelectedCurriculum({ ...c, selectedStage: stageKey }); openModal('documentUpload') }, [openModal, setSelectedCurriculum])
  const handleOpenNotes            = useCallback((c: CurriculumTracking, stageKey: string) => { setSelectedCurriculum({ ...c, selectedStage: stageKey }); openModal('notes') }, [openModal, setSelectedCurriculum])

  // ── Action handlers (partially stubbed — document/notes require stepId) ───
  const handleDocumentUpload = useCallback(async (_data: { file: File; documentType: string; notes: string }) => {
    setIsActionLoading(true)
    try {
      showNotification('Document uploaded successfully', 'success')
      closeModal('documentUpload')
    } finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const handleSaveNotes = useCallback(async (_notes: string) => {
    setIsActionLoading(true)
    try { showNotification('Notes saved successfully', 'success'); closeModal('notes') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  // ── Initiate (real API) ────────────────────────────────────────────────────
  const handleInitiate = useCallback(async (rawForm: unknown, _docs: File[]) => {
    const form = rawForm as {
      schoolId: string; departmentId: string; proposedCurriculumName: string
      proposedCurriculumCode: string; proposedDurationSemesters: string
      curriculumDescription: string; proposedEffectiveDate: string
      proposedExpiryDate: string; initialNotes: string
    }
    if (!form.schoolId) { showNotification('School is required', 'error'); return }
    setIsActionLoading(true)
    try {
      const payload: InitiateTrackingRequest = {
        schoolId:                Number(form.schoolId),
        departmentId:            Number(form.departmentId),
        proposedCurriculumName:  form.proposedCurriculumName,
        proposedCurriculumCode:  form.proposedCurriculumCode,
        proposedDurationSemesters: form.proposedDurationSemesters ? Number(form.proposedDurationSemesters) : undefined,
        curriculumDescription:   form.curriculumDescription || undefined,
        proposedEffectiveDate:   form.proposedEffectiveDate || undefined,
        proposedExpiryDate:      form.proposedExpiryDate || undefined,
        initialNotes:            form.initialNotes || undefined,
      }
      await initiateTracking({ data: payload })
      showNotification('Curriculum tracking initiated successfully', 'success')
      closeModal('initiateCurriculum')
    } catch {
      showNotification('Failed to initiate curriculum tracking', 'error')
    } finally { setIsActionLoading(false) }
  }, [closeModal, initiateTracking, setIsActionLoading, showNotification])

  const handleUpdate = useCallback(async (_id: string | number, _data: EditFormData, _docs: File[]) => {
    setIsActionLoading(true)
    try { showNotification('Tracking updated successfully', 'success'); closeModal('editTracking') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const handleAssign = useCallback(async (_id: string | number, _userId: string, _notes?: string) => {
    setIsActionLoading(true)
    try { showNotification('Tracking assigned successfully', 'success'); closeModal('assignTracking') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const handleToggleStatus = useCallback(async (_id: string | number, isActive: boolean, _notes?: string) => {
    setIsActionLoading(true)
    try { showNotification(`Tracking ${isActive ? 'deactivated' : 'reactivated'} successfully`, 'success'); closeModal('statusManagement') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const stageKeys  = TRACKING_STAGES.map((s) => s.key)
  const statusKeys = ['under_review', 'pending_approval', 'on_hold', 'completed', 'rejected']

  return (
    <div className="space-y-6 animate-fade-in">
      <TrackingNotificationBanner notification={notification} onClose={hideNotification} />

      <TrackingHeader
        currentViewMode={viewMode}
        trackingStats={statsData}
        trackingCount={filteredCurricula.length}
        onRefresh={handleRefresh}
        onInitiateCurriculum={() => openModal('initiateCurriculum')}
        onShowMyInitiated={handleShowMyInitiated}
        onShowMyAssigned={handleShowMyAssigned}
        onShowBySchool={handleShowBySchool}
        onShowByDepartment={handleShowByDepartment}
        onShowByAssignee={handleShowByAssignee}
        onShowByInitiator={handleShowByInitiator}
        onExportData={handleExport}
      />

      {isPending && allCurricula.length === 0 ? (
        <TrackingPageSkeleton />
      ) : (
        <>
          {/* Stats bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total',       value: statsData.total       ?? 0, gradient: 'from-must-green to-must-teal' },
              { label: 'In Progress', value: statsData.inProgress  ?? 0, gradient: 'from-amber-500 to-amber-600' },
              { label: 'On Hold',     value: statsData.onHold      ?? 0, gradient: 'from-red-500 to-red-600' },
              { label: 'Completed',   value: statsData.completed   ?? 0, gradient: 'from-must-green to-must-teal' },
            ].map(({ label, value, gradient }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 shadow-soft p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br ${gradient}`}>
                    <i className="fas fa-chart-bar text-sm" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          <TrackingFilters
            filters={filters}
            schools={filterSchools}
            departments={filterDepartments}
            stages={stageKeys}
            statuses={statusKeys}
            currentViewMode={viewMode}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
          />

          <CurriculumWorkflowSelector
            curricula={filteredCurricula}
            isLoading={isActionLoading}
            onStageAction={handleStageAction}
            onUploadDocument={handleOpenDocumentUpload}
            onAddNotes={handleOpenNotes}
            onEditTracking={(c: CurriculumTracking) => openModal('editTracking', c)}
            onAssignTracking={(c: CurriculumTracking) => openModal('assignTracking', c)}
            onToggleStatus={(c: CurriculumTracking) => openModal('statusManagement', c)}
          />
        </>
      )}

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {modals.documentUpload && selectedCurriculum && (
        <DocumentUploadModal curriculum={selectedCurriculum} onClose={() => closeModal('documentUpload')} onUpload={handleDocumentUpload} />
      )}
      {modals.notes && selectedCurriculum && (
        <NotesModal curriculum={selectedCurriculum} onClose={() => closeModal('notes')} onSave={handleSaveNotes} />
      )}
      {modals.initiateCurriculum && (
        <InitiateCurriculumModal onClose={() => closeModal('initiateCurriculum')} onInitiate={handleInitiate} />
      )}
      {modals.editTracking && selectedCurriculum && (
        <EditTrackingModal curriculum={selectedCurriculum} onClose={() => closeModal('editTracking')} onUpdate={handleUpdate} />
      )}
      {modals.assignTracking && selectedCurriculum && (
        <AssignTrackingModal curriculum={selectedCurriculum} onClose={() => closeModal('assignTracking')} onAssign={handleAssign} />
      )}
      {modals.statusManagement && selectedCurriculum && (
        <StatusManagementModal curriculum={selectedCurriculum} onClose={() => closeModal('statusManagement')} onStatusChange={handleToggleStatus} />
      )}
      {modals.documentViewer && selectedCurriculum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => closeModal('documentViewer')} role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                <i className="fas fa-folder-open text-must-green" aria-hidden="true" />
                Documents — {selectedCurriculum.trackingId}
              </h2>
              <button onClick={() => closeModal('documentViewer')} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
                <i className="fas fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <DocumentViewer
                trackingId={selectedCurriculum.id}
                showUploadButton
                onUploadClick={() => { closeModal('documentViewer'); openModal('documentUpload') }}
                onDocumentAction={(action, doc) => {
                  if (action === 'download' && doc.fileUrl) {
                    Object.assign(document.createElement('a'), { href: doc.fileUrl, download: doc.originalFilename ?? 'document' }).click()
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
