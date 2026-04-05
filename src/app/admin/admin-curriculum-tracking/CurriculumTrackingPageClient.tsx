'use client'

import { useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking, TrackingViewMode } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { useTrackingPage } from '@/hooks/tracking/useTrackingPage'
import { mockCurriculumTrackingData, mockTrackingStats } from '@/lib/mock-data'

import { TrackingHeader }            from '@/components/admin/curriculum-tracking/header/TrackingHeader'
import { TrackingFilters }           from '@/components/admin/curriculum-tracking/filters/TrackingFilters'
import { CurriculumWorkflowSelector } from '@/components/admin/curriculum-tracking/workflow/CurriculumWorkflowSelector'
import { TrackingTable }             from '@/components/admin/curriculum-tracking/table/TrackingTable'
import { TrackingNotificationBanner } from '@/components/admin/curriculum-tracking/shared/TrackingNotificationBanner'
import { DocumentViewer }            from '@/components/admin/curriculum-tracking/shared/DocumentViewer'
import { 
  TrackingPageSkeleton, 
  TrackingHeaderSkeleton, 
  TrackingStatsSkeleton, 
  TrackingFiltersSkeleton, 
  TrackingTableSkeleton 
} from '@/components/admin/curriculum-tracking/shared/TrackingSkeletons'
import { StageDetailsModal }         from '@/components/admin/curriculum-tracking/modals/StageDetailsModal'
import { DocumentUploadModal }       from '@/components/admin/curriculum-tracking/modals/DocumentUploadModal'
import { NotesModal }                from '@/components/admin/curriculum-tracking/modals/NotesModal'
import { InitiateCurriculumModal }   from '@/components/admin/curriculum-tracking/modals/InitiateCurriculumModal'
import { EditTrackingModal }         from '@/components/admin/curriculum-tracking/modals/EditTrackingModal'
import { AssignTrackingModal, StatusManagementModal } from '@/components/admin/curriculum-tracking/modals/TrackingManagementModals'
import type { EditFormData } from '@/components/admin/curriculum-tracking/modals/EditTrackingModal'

// ─── Mock service stubs — replace with real API calls ─────────────────────────
async function mockLoadCurricula(): Promise<CurriculumTracking[]> {
  await new Promise((r) => setTimeout(r, 800))
  return mockCurriculumTrackingData
}

async function mockLoadStats() {
  await new Promise((r) => setTimeout(r, 600))
  return mockTrackingStats
}

export function CurriculumTrackingPageClient() {
  const {
    isLoading, setIsLoading, isActionLoading, setIsActionLoading,
    error, setError, viewMode, setViewMode,
    curricula, setCurricula, selectedCurriculum, setSelectedCurriculum,
    filters, modals, notification, pagination, setPagination,
    statsData, setStatsData, currentDataSource, setCurrentDataSource,
    currentIdentifier, setCurrentIdentifier,
    filteredCurricula, filterSchools, filterDepartments,
    showNotification, hideNotification, openModal, closeModal,
    updateFilter, clearFilters,
  } = useTrackingPage()

  // ─── Initial load ──────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setIsLoading(true); setError(null)
      try {
        const [data, stats] = await Promise.all([mockLoadCurricula(), mockLoadStats()])
        setCurricula(data)
        setStatsData(stats)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load tracking data')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // ─── View mode helpers ─────────────────────────────────────────────────────
  const handleViewMode        = useCallback((mode: TrackingViewMode) => setViewMode(mode), [setViewMode])
  const handleShowMyInitiated = useCallback(() => setViewMode('my-initiated'), [setViewMode])
  const handleShowMyAssigned  = useCallback(() => setViewMode('my-assigned'), [setViewMode])

  const handleShowBySchool = useCallback((id: string) => {
    setViewMode('by-school'); setCurrentDataSource('by-school'); setCurrentIdentifier(id)
  }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])

  const handleShowByDepartment = useCallback((id: string) => {
    setViewMode('by-department'); setCurrentDataSource('by-department'); setCurrentIdentifier(id)
  }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])

  const handleShowByAssignee = useCallback((id: string) => {
    setViewMode('by-assignee'); setCurrentDataSource('by-assignee'); setCurrentIdentifier(id)
  }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])

  const handleShowByInitiator = useCallback((id: string) => {
    setViewMode('by-initiator'); setCurrentDataSource('by-initiator'); setCurrentIdentifier(id)
  }, [setViewMode, setCurrentDataSource, setCurrentIdentifier])

  const handleExport = useCallback((format: string) => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(filteredCurricula, null, 2)], { type: 'application/json' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = 'tracking-export.json'; a.click()
      URL.revokeObjectURL(url)
      showNotification('Exported as JSON', 'success')
    } else if (format === 'csv') {
      showNotification('CSV export started…', 'success')
    }
  }, [filteredCurricula, showNotification])

  const handleRefresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await mockLoadCurricula()
      setCurricula(data)
      showNotification('Data refreshed successfully', 'success')
    } catch {
      showNotification('Failed to refresh data', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [setCurricula, setIsLoading, showNotification])

  // ─── Stage actions ─────────────────────────────────────────────────────────
  const handleStageAction = useCallback(async (
    id: string | number, stageKey: string, action: string,
    payload?: { feedback?: string; returnToStage?: string | null }
  ) => {
    setIsActionLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      showNotification(`Stage ${action} completed successfully`, 'success')
    } catch {
      showNotification(`Failed to ${action} stage`, 'error')
    } finally {
      setIsActionLoading(false)
    }
  }, [setIsActionLoading, showNotification])

  // ─── Modal openers ─────────────────────────────────────────────────────────
  const handleViewDetails = useCallback((c: CurriculumTracking) => {
    setSelectedCurriculum(c); openModal('stageDetails', c)
  }, [openModal, setSelectedCurriculum])

  const handleOpenDocumentUpload = useCallback((c: CurriculumTracking, stageKey: string) => {
    setSelectedCurriculum({ ...c, selectedStage: stageKey })
    openModal('documentUpload')
  }, [openModal, setSelectedCurriculum])

  const handleOpenNotes = useCallback((c: CurriculumTracking, stageKey: string) => {
    setSelectedCurriculum({ ...c, selectedStage: stageKey })
    openModal('notes')
  }, [openModal, setSelectedCurriculum])

  // ─── Action handlers ───────────────────────────────────────────────────────
  const handleDocumentUpload = useCallback(async (data: { file: File; documentType: string; notes: string }) => {
    setIsActionLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      showNotification(`Document uploaded successfully`, 'success')
      closeModal('documentUpload')
    } catch { showNotification('Failed to upload document', 'error') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const handleSaveNotes = useCallback(async (_notes: string) => {
    setIsActionLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      showNotification('Notes saved successfully', 'success')
      closeModal('notes')
    } catch { showNotification('Failed to save notes', 'error') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const handleInitiate = useCallback(async (_formData: unknown, _docs: File[]) => {
    setIsActionLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      showNotification('Curriculum tracking initiated successfully', 'success')
      closeModal('initiateCurriculum')
      handleRefresh()
    } catch { showNotification('Failed to initiate curriculum tracking', 'error') }
    finally { setIsActionLoading(false) }
  }, [closeModal, handleRefresh, setIsActionLoading, showNotification])

  const handleUpdate = useCallback(async (_id: string | number, _data: EditFormData, _docs: File[]) => {
    setIsActionLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      showNotification('Tracking updated successfully', 'success')
      closeModal('editTracking')
      handleRefresh()
    } catch { showNotification('Failed to update tracking', 'error') }
    finally { setIsActionLoading(false) }
  }, [closeModal, handleRefresh, setIsActionLoading, showNotification])

  const handleAssign = useCallback(async (_id: string | number, _userId: string, _notes?: string) => {
    setIsActionLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      showNotification('Tracking assigned successfully', 'success')
      closeModal('assignTracking')
    } catch { showNotification('Failed to assign tracking', 'error') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const handleToggleStatus = useCallback(async (_id: string | number, isCurrentlyActive: boolean, _notes?: string) => {
    setIsActionLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      showNotification(`Tracking ${isCurrentlyActive ? 'deactivated' : 'reactivated'} successfully`, 'success')
      closeModal('statusManagement')
    } catch { showNotification('Failed to change tracking status', 'error') }
    finally { setIsActionLoading(false) }
  }, [closeModal, setIsActionLoading, showNotification])

  const handleDownloadDocument = useCallback((_docId: string | number, filename: string) => {
    showNotification(`Downloading ${filename}…`, 'info')
  }, [showNotification])

  const stageKeys  = TRACKING_STAGES.map((s) => s.key)
  const statusKeys = ['under_review', 'pending_approval', 'on_hold', 'completed', 'rejected']

  // ─── Error state ───────────────────────────────────────────────────────────
  if (!isLoading && error && curricula.length === 0) {
    return (
      <div className="p-8">
        <div className="text-center py-16 bg-white rounded-2xl border border-red-200 shadow-soft">
          <i className="fas fa-exclamation-triangle text-4xl text-red-400 mb-4 block" aria-hidden="true" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Failed to Load Tracking Data</h3>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <button onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-xl hover:-translate-y-px hover:shadow-green transition-all">
            <i className="fas fa-sync-alt" aria-hidden="true" /> Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <TrackingNotificationBanner notification={notification} onClose={hideNotification} />

      <TrackingHeader
        currentViewMode={viewMode}
        trackingStats={statsData}
        trackingCount={filteredCurricula.length}
        onRefresh={handleRefresh}
        onInitiateCurriculum={() => openModal('initiateCurriculum')}
        onViewMode={handleViewMode}
        onShowMyInitiated={handleShowMyInitiated}
        onShowMyAssigned={handleShowMyAssigned}
        onShowBySchool={handleShowBySchool}
        onShowByDepartment={handleShowByDepartment}
        onShowByAssignee={handleShowByAssignee}
        onShowByInitiator={handleShowByInitiator}
        onExportData={handleExport}
      />

      {isLoading && curricula.length === 0 ? (
        <TrackingPageSkeleton />
      ) : (
        <>
          {/* Stats Cards */}
          {statsData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">My Assigned</p>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br from-must-green to-must-green-dark">
                    <i className="fas fa-user-check text-sm" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold text-gray-800">{statsData.myAssigned ?? 0}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">In Progress</p>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br from-amber-500 to-amber-600">
                    <i className="fas fa-clock text-sm" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold text-gray-800">{statsData.inProgress ?? 0}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">On Hold</p>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br from-red-500 to-red-600">
                    <i className="fas fa-pause-circle text-sm" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold text-gray-800">{statsData.onHold ?? 0}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed</p>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm bg-gradient-to-br from-must-green to-must-green-dark">
                    <i className="fas fa-check-circle text-sm" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-4xl font-extrabold text-gray-800">{statsData.completed ?? 0}</p>
              </div>
            </div>
          )}

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

          {viewMode === 'workflow' ? (
            <CurriculumWorkflowSelector
              curricula={filteredCurricula}
              isLoading={isActionLoading}
              onStageAction={handleStageAction}
              onViewDetails={handleViewDetails}
              onUploadDocument={handleOpenDocumentUpload}
              onAddNotes={handleOpenNotes}
              onEditTracking={(c: CurriculumTracking) => openModal('editTracking', c)}
              onAssignTracking={(c: CurriculumTracking) => openModal('assignTracking', c)}
              onToggleStatus={(c: CurriculumTracking) => openModal('statusManagement', c)}
            />
          ) : (
            <TrackingTable
              curricula={filteredCurricula}
              isLoading={isActionLoading}
              currentViewMode={viewMode}
              currentDataSource={currentDataSource}
              onStageAction={handleStageAction}
              onViewDetails={handleViewDetails}
              onEditTracking={(c) => openModal('editTracking', c)}
              onAssignTracking={(c) => openModal('assignTracking', c)}
              onToggleStatus={(c) => openModal('statusManagement', c)}
            />
          )}
        </>
      )}

      {/* ─── Modals ─────────────────────────────────────────────────────── */}
      {modals.stageDetails && selectedCurriculum && (
        <StageDetailsModal
          curriculum={selectedCurriculum}
          onClose={() => closeModal('stageDetails')}
          onStageAction={handleStageAction}
          onUploadDocument={() => { closeModal('stageDetails'); openModal('documentUpload') }}
          onAddNotes={() => { closeModal('stageDetails'); openModal('notes') }}
          onDownloadDocument={handleDownloadDocument}
        />
      )}

      {modals.documentUpload && selectedCurriculum && (
        <DocumentUploadModal
          curriculum={selectedCurriculum}
          onClose={() => closeModal('documentUpload')}
          onUpload={handleDocumentUpload}
        />
      )}

      {modals.notes && selectedCurriculum && (
        <NotesModal
          curriculum={selectedCurriculum}
          onClose={() => closeModal('notes')}
          onSave={handleSaveNotes}
        />
      )}

      {modals.initiateCurriculum && (
        <InitiateCurriculumModal
          onClose={() => closeModal('initiateCurriculum')}
          onInitiate={handleInitiate}
        />
      )}

      {modals.editTracking && selectedCurriculum && (
        <EditTrackingModal
          curriculum={selectedCurriculum}
          onClose={() => closeModal('editTracking')}
          onUpdate={handleUpdate}
        />
      )}

      {modals.assignTracking && selectedCurriculum && (
        <AssignTrackingModal
          curriculum={selectedCurriculum}
          onClose={() => closeModal('assignTracking')}
          onAssign={handleAssign}
        />
      )}

      {modals.statusManagement && selectedCurriculum && (
        <StatusManagementModal
          curriculum={selectedCurriculum}
          onClose={() => closeModal('statusManagement')}
          onStatusChange={handleToggleStatus}
        />
      )}

      {modals.documentViewer && selectedCurriculum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => closeModal('documentViewer')} role="dialog" aria-modal="true" aria-label="Document Viewer">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                <i className="fas fa-folder-open text-must-green" aria-hidden="true" />
                Documents — {selectedCurriculum.trackingId}
              </h2>
              <button onClick={() => closeModal('documentViewer')}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
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
                    const a = document.createElement('a')
                    a.href = doc.fileUrl; a.download = doc.originalFilename ?? 'document'; a.click()
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
