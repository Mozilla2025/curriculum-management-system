'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { CurriculumTracking, TrackingStageConfig } from '@/types/tracking'
import { getStatusInfo, formatTrackingDate } from '@/lib/tracking/utils'
import { ConfirmationModal } from '@/components/admin/curricula/detail/ConfirmationModal'

interface Props {
  curriculum: CurriculumTracking
  stage: TrackingStageConfig
  isCurrentStage: boolean
  isExpanded: boolean
  onToggleExpand: () => void
  onStageAction: (id: string | number, stageKey: string, action: string, payload?: { feedback?: string; returnToStage?: string | null }) => void
  onUploadDocument: (c: CurriculumTracking, stageKey: string) => void
  onAddNotes: (c: CurriculumTracking, stageKey: string) => void
  onEditTracking: (c: CurriculumTracking) => void
  onAssignTracking: (c: CurriculumTracking) => void
  onToggleStatus: (c: CurriculumTracking) => void
}

type PendingAction = 'approve' | 'sendBack' | 'reject'

const NEXT_STAGE: Record<string, string> = {
  department_submission: 'School Board Review',
  school_board_review:   'Dean Committee',
  dean_committee:        'Senate Review',
  senate_review:         'Quality Assurance',
  quality_assurance:     'CUE Submission',
  cue_submission:        'CUE Review',
  cue_review:            'Final Approval',
  final_approval:        'Accredited',
}

const PREV_STAGE: Record<string, string> = {
  school_board_review: 'Department',
  dean_committee:      'School Board Review',
  senate_review:       'Dean Committee',
  quality_assurance:   'Dean Committee',
  cue_submission:      'Quality Assurance',
  cue_review:          'Quality Assurance',
  final_approval:      'CUE Review',
}

const PREV_STAGE_KEY: Record<string, string> = {
  school_board_review: 'department_submission',
  dean_committee:      'school_board_review',
  senate_review:       'dean_committee',
  quality_assurance:   'dean_committee',
  cue_submission:      'quality_assurance',
  cue_review:          'quality_assurance',
  final_approval:      'cue_review',
}

export function WorkflowStage({
  curriculum, stage, isCurrentStage, isExpanded, onToggleExpand,
  onStageAction, onUploadDocument, onAddNotes,
  onEditTracking, onAssignTracking, onToggleStatus,
}: Props) {
  const router = useRouter()
  const stageData = curriculum.stages[stage.key]
  const status    = stageData?.status ?? (isCurrentStage ? curriculum.status : 'pending')
  const si        = getStatusInfo(status)

  const isCompleted = status === 'completed'
  const isOnHold    = status === 'on_hold'
  const days        = curriculum.daysInCurrentStage ?? 0
  const daysWarning = isCurrentStage && days > 14

  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null)
  const [showMore, setShowMore] = useState(false)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setShowMore(false)
      }
    }
    if (showMore) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showMore])

  const destinationStage =
    pendingAction === 'approve'  ? (NEXT_STAGE[stage.key] ?? 'the next stage') :
    pendingAction === 'sendBack' ? (PREV_STAGE[stage.key] ?? 'the previous stage') :
    'Department'

  const handleConfirm = (reason?: string) => {
    if (!pendingAction) return
    onStageAction(curriculum.id, stage.key, pendingAction, {
      feedback:      reason,
      returnToStage: pendingAction === 'sendBack' ? (PREV_STAGE_KEY[stage.key] ?? null) : null,
    })
    setPendingAction(null)
  }

  return (
    <>
      <div className={cn(
        'rounded-xl border-2 transition-all duration-300 mb-3',
        isCurrentStage
          ? 'border-must-green shadow-green/20 shadow-md'
          : isCompleted
            ? 'border-emerald-200'
            : 'border-gray-200 hover:border-must-green/40',
      )}>
        {/* Stage header */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50/50 transition-colors rounded-xl"
          aria-expanded={isExpanded}
        >
          <div className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
            isCompleted ? 'bg-emerald-500' : isCurrentStage ? 'bg-gradient-to-br from-must-green to-must-green-dark' : 'bg-gray-300',
          )}>
            {isCompleted ? <i className="fas fa-check text-xs" aria-hidden="true" /> : stage.order}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <i className={cn(stage.icon, 'text-gray-500 text-sm')} aria-hidden="true" />
              <span className="font-semibold text-sm text-gray-900">{stage.title}</span>
              {isCurrentStage && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white animate-pulse">
                  ACTION NEEDED
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{stage.description}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isCurrentStage && (
              <span className={cn(
                'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
                daysWarning ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600',
              )}>
                <i className="fas fa-clock text-[10px]" aria-hidden="true" />
                {days}d
              </span>
            )}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full border"
              style={{ backgroundColor: si.bgColor, color: si.color, borderColor: `${si.color}40` }}
            >
              <i className={cn(si.icon, 'text-[10px]')} aria-hidden="true" />
              {si.label}
            </span>
            <i className={cn('fas text-gray-400 text-xs transition-transform duration-200', isExpanded ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" />
          </div>
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-gray-100 pt-3 animate-fade-in">

            {/* ── Primary action area (current stage only) ── */}
            {isCurrentStage && !isCompleted && (
              <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  What would you like to do?
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Approve */}
                  <button
                    onClick={() => setPendingAction('approve')}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-must-green hover:bg-must-green-dark hover:-translate-y-px hover:shadow-md transition-all"
                  >
                    <i className="fas fa-check text-xs" aria-hidden="true" />
                    Approve
                  </button>

                  {PREV_STAGE[stage.key] && (
                    <button
                      onClick={() => setPendingAction('sendBack')}
                      className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 hover:-translate-y-px transition-all"
                    >
                      <i className="fas fa-undo text-xs" aria-hidden="true" />
                      Send Back
                    </button>
                  )}

                  <button
                    onClick={() => setPendingAction('reject')}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 hover:-translate-y-px transition-all"
                  >
                    <i className="fas fa-times text-xs" aria-hidden="true" />
                    Reject
                  </button>

                  {/* More options */}
                  <div ref={moreMenuRef} className="relative flex-shrink-0">
                    <button
                      onClick={() => setShowMore((v) => !v)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 h-10 rounded-lg border text-sm font-semibold transition-all whitespace-nowrap',
                        showMore
                          ? 'bg-gray-100 border-gray-300 text-gray-700'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50',
                      )}
                      aria-label="More options"
                    >
                      <i className="fas fa-ellipsis-h text-xs" aria-hidden="true" />
                      More
                      <i className={cn('fas text-[10px] transition-transform duration-200', showMore ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" />
                    </button>

                    {showMore && (
                      <div className="absolute right-0 top-12 z-20 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 animate-fade-in">
                        {[
                          { label: 'Details',    icon: 'fas fa-eye',       action: () => { router.push(`/admin/admin-curriculum-tracking/${curriculum.id}`); setShowMore(false) } },
                          { label: 'Upload',     icon: 'fas fa-upload',    action: () => { onUploadDocument(curriculum, stage.key); setShowMore(false) } },
                          { label: 'Notes',      icon: 'fas fa-sticky-note', action: () => { onAddNotes(curriculum, stage.key); setShowMore(false) } },
                          { label: 'Edit',       icon: 'fas fa-edit',      action: () => { onEditTracking(curriculum); setShowMore(false) } },
                          { label: 'Assign',     icon: 'fas fa-user-plus', action: () => { onAssignTracking(curriculum); setShowMore(false) } },
                          {
                            label: curriculum.isActive ? 'Deactivate' : 'Activate',
                            icon: curriculum.isActive ? 'fas fa-pause' : 'fas fa-play',
                            action: () => { onToggleStatus(curriculum); setShowMore(false) },
                          },
                        ].map(({ label, icon, action }) => (
                          <button
                            key={label}
                            onClick={action}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                          >
                            <i className={cn(icon, 'w-4 text-gray-400 text-xs')} aria-hidden="true" />
                            {label}
                          </button>
                        ))}

                        {isOnHold && (
                          <button
                            onClick={() => { onStageAction(curriculum.id, stage.key, 'resume'); setShowMore(false) }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-must-green font-semibold hover:bg-must-green/5 transition-colors text-left border-t border-gray-100 mt-1"
                          >
                            <i className="fas fa-play w-4 text-xs" aria-hidden="true" />
                            Resume
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Current stage banner (non-action stages) */}
            {isCurrentStage && isCompleted && (
              <div className="mb-3 px-3 py-2 bg-must-green/10 border border-must-green/20 rounded-lg inline-flex items-center gap-2 text-xs font-semibold text-must-green-darker">
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                Current Stage — awaiting action
              </div>
            )}

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
              {[
                { label: 'Assigned To', value: stageData?.assignedTo ?? curriculum.currentAssigneeName ?? 'Unassigned', icon: 'fas fa-user',            cls: 'bg-blue-50 border-blue-100' },
                { label: 'Started',     value: formatTrackingDate(stageData?.startedDate),                              icon: 'fas fa-play',            cls: 'bg-must-green/5 border-must-green/10' },
                { label: 'Completed',   value: formatTrackingDate(stageData?.completedDate),                            icon: 'fas fa-flag-checkered',  cls: 'bg-emerald-50 border-emerald-100' },
                { label: 'Documents',   value: `${stageData?.documents?.length ?? 0} files`,                            icon: 'fas fa-file-alt',        cls: 'bg-gray-50 border-gray-100' },
              ].map(({ label, value, icon, cls }) => (
                <div key={label} className={cn('p-2.5 rounded-lg border', cls)}>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1 flex-wrap">
                    <i className={cn(icon, 'text-[10px] flex-shrink-0')} aria-hidden="true" />
                    <span className="truncate">{label}</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-700 truncate">{value}</div>
                </div>
              ))}
            </div>

            {/* Notes */}
            {stageData?.notes && (
              <div className="mb-3 p-2.5 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="flex items-center gap-1 text-[10px] text-amber-700 font-semibold uppercase mb-1">
                  <i className="fas fa-sticky-note" aria-hidden="true" /> Notes
                </div>
                <p className="text-xs text-amber-900 line-clamp-2">{stageData.notes}</p>
              </div>
            )}

            {/* Secondary tools for non-current stages */}
            {!isCurrentStage && (
              <div className="flex flex-wrap gap-2 items-start">
                <button
                  onClick={() => router.push(`/admin/admin-curriculum-tracking/${curriculum.id}`)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
                >
                  <i className="fas fa-eye" aria-hidden="true" /> Details
                </button>
                <button
                  onClick={() => onUploadDocument(curriculum, stage.key)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
                >
                  <i className="fas fa-upload" aria-hidden="true" /> Upload
                </button>
                <button
                  onClick={() => onAddNotes(curriculum, stage.key)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
                >
                  <i className="fas fa-sticky-note" aria-hidden="true" /> Notes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={pendingAction !== null}
        actionType={pendingAction ?? 'approve'}
        curriculumTitle={curriculum.displayTitle ?? curriculum.title}
        destinationStage={destinationStage}
        requiresReason={pendingAction === 'reject' || pendingAction === 'sendBack'}
        onConfirm={handleConfirm}
        onCancel={() => setPendingAction(null)}
      />
    </>
  )
}
