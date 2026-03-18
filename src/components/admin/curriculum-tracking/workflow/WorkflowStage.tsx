'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking, TrackingStageConfig } from '@/types/tracking'
import { getStatusInfo, formatTrackingDate } from '@/lib/tracking/utils'

interface Props {
  curriculum: CurriculumTracking
  stage: TrackingStageConfig
  isCurrentStage: boolean
  isExpanded: boolean
  onToggleExpand: () => void
  onStageAction: (id: string | number, stageKey: string, action: string) => void
  onViewDetails: (c: CurriculumTracking) => void
  onUploadDocument: (c: CurriculumTracking, stageKey: string) => void
  onAddNotes: (c: CurriculumTracking, stageKey: string) => void
  onEditTracking: (c: CurriculumTracking) => void
  onAssignTracking: (c: CurriculumTracking) => void
  onToggleStatus: (c: CurriculumTracking) => void
}

export function WorkflowStage({
  curriculum, stage, isCurrentStage, isExpanded, onToggleExpand,
  onStageAction, onViewDetails, onUploadDocument, onAddNotes,
  onEditTracking, onAssignTracking, onToggleStatus,
}: Props) {
  const stageData = curriculum.stages[stage.key]
  const status    = stageData?.status ?? (isCurrentStage ? curriculum.status : 'pending')
  const si        = getStatusInfo(status)

  const isCompleted   = status === 'completed'
  const isUnderReview = ['under_review', 'on_hold'].includes(status)
  const days          = curriculum.daysInCurrentStage ?? 0
  const daysWarning   = isCurrentStage && days > 14

  return (
    <div className={cn('rounded-xl border-2 transition-all duration-300 mb-3',
      isCurrentStage ? 'border-must-green shadow-green/20 shadow-md' : isCompleted ? 'border-emerald-200' : 'border-gray-200 hover:border-must-green/40')}>
      {/* Stage header */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50/50 transition-colors rounded-xl"
        aria-expanded={isExpanded}
      >
        {/* Stage number badge */}
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0',
          isCompleted ? 'bg-emerald-500' : isCurrentStage ? 'bg-gradient-to-br from-must-green to-must-green-dark' : 'bg-gray-300')}>
          {isCompleted ? <i className="fas fa-check text-xs" aria-hidden="true" /> : stage.order}
        </div>

        {/* Stage info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <i className={cn(stage.icon, 'text-gray-500 text-sm')} aria-hidden="true" />
            <span className="font-semibold text-sm text-gray-900">{stage.title}</span>
            {isCurrentStage && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white animate-pulse">ACTION NEEDED</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{stage.description}</p>
        </div>

        {/* Quick status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isCurrentStage && (
            <span className={cn('flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
              daysWarning ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600')}>
              <i className="fas fa-clock text-[10px]" aria-hidden="true" />
              {days}d
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full border"
            style={{ backgroundColor: si.bgColor, color: si.color, borderColor: `${si.color}40` }}>
            <i className={cn(si.icon, 'text-[10px]')} aria-hidden="true" />
            {si.label}
          </span>
          <i className={cn('fas text-gray-400 text-xs transition-transform duration-200', isExpanded ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" />
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 animate-fade-in">
          {isCurrentStage && (
            <div className="mb-3 px-3 py-2 bg-must-green/10 border border-must-green/20 rounded-lg inline-flex items-center gap-2 text-xs font-semibold text-must-green-darker">
              <i className="fas fa-map-marker-alt" aria-hidden="true" />
              Current Stage — awaiting action
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
            {[
              { label: 'Assigned To',  value: stageData?.assignedTo ?? curriculum.currentAssigneeName ?? 'Unassigned', icon: 'fas fa-user', cls: 'bg-blue-50 border-blue-100' },
              { label: 'Started',      value: formatTrackingDate(stageData?.startedDate),                              icon: 'fas fa-play', cls: 'bg-must-green/5 border-must-green/10' },
              { label: 'Completed',    value: formatTrackingDate(stageData?.completedDate),                            icon: 'fas fa-flag-checkered', cls: 'bg-emerald-50 border-emerald-100' },
              { label: 'Documents',    value: `${stageData?.documents?.length ?? 0} files`,                            icon: 'fas fa-file-alt', cls: 'bg-gray-50 border-gray-100' },
            ].map(({ label, value, icon, cls }) => (
              <div key={label} className={cn('p-2.5 rounded-lg border', cls)}>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1 flex-wrap">
                  <i className={cn(icon, 'text-[10px] flex-shrink-0')} aria-hidden="true" /><span className="truncate">{label}</span>
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

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 items-start">
            {isUnderReview && (
              <>
                <button onClick={() => onStageAction(curriculum.id, stage.key, 'approve')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 hover:-translate-y-px hover:shadow-soft transition-all whitespace-nowrap">
                  <i className="fas fa-check" aria-hidden="true" /> Approve
                </button>
                <button onClick={() => onStageAction(curriculum.id, stage.key, 'hold')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 hover:-translate-y-px hover:shadow-soft transition-all whitespace-nowrap">
                  <i className="fas fa-pause" aria-hidden="true" /> Hold
                </button>
                <button onClick={() => onStageAction(curriculum.id, stage.key, 'reject')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 hover:-translate-y-px hover:shadow-soft transition-all whitespace-nowrap">
                  <i className="fas fa-times" aria-hidden="true" /> Reject
                </button>
              </>
            )}
            {status === 'on_hold' && (
              <button onClick={() => onStageAction(curriculum.id, stage.key, 'resume')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-lg hover:-translate-y-px hover:shadow-soft transition-all whitespace-nowrap">
                <i className="fas fa-play" aria-hidden="true" /> Resume
              </button>
            )}

            {/* Action buttons - all visible */}
            <button onClick={() => onViewDetails(curriculum)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
              title="View full curriculum details">
              <i className="fas fa-eye" aria-hidden="true" /> Details
            </button>

            <button onClick={() => onUploadDocument(curriculum, stage.key)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
              title="Upload documents for this stage">
              <i className="fas fa-upload" aria-hidden="true" /> Upload
            </button>

            <button onClick={() => onAddNotes(curriculum, stage.key)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
              title="Add notes or comments">
              <i className="fas fa-sticky-note" aria-hidden="true" /> Notes
            </button>

            <button onClick={() => onEditTracking(curriculum)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
              title="Edit tracking information">
              <i className="fas fa-edit" aria-hidden="true" /> Edit
            </button>

            <button onClick={() => onAssignTracking(curriculum)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
              title="Assign to a team member">
              <i className="fas fa-user-plus" aria-hidden="true" /> Assign
            </button>

            <button onClick={() => onToggleStatus(curriculum)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all whitespace-nowrap"
              title={curriculum.isActive ? 'Deactivate this tracking' : 'Activate this tracking'}>
              <i className={cn(curriculum.isActive ? 'fas fa-pause' : 'fas fa-play')} aria-hidden="true" /> {curriculum.isActive ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
