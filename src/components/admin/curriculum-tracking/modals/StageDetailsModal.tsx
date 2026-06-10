'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking, TrackingStageKey } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { getStatusInfo, formatTrackingDate, formatTrackingDateTime } from '@/lib/tracking/utils'

interface Props {
  curriculum: CurriculumTracking
  onClose: () => void
  onUploadDocument: () => void
  onAddNotes: () => void
  onDownloadDocument: (docId: string | number, filename: string) => void
}

type Tab = 'overview' | 'details' | 'people' | 'timeline' | 'documents' | 'notes'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'overview',   label: 'Overview',          icon: 'fas fa-info-circle' },
  { key: 'details',    label: 'Curriculum Details', icon: 'fas fa-book' },
  { key: 'people',     label: 'People',             icon: 'fas fa-users' },
  { key: 'timeline',   label: 'Timeline',           icon: 'fas fa-clock' },
  { key: 'documents',  label: 'Documents',          icon: 'fas fa-file-alt' },
  { key: 'notes',      label: 'Notes',              icon: 'fas fa-sticky-note' },
]

function Field({ label, value, type = 'text', icon }: {
  label: string
  value?: string | number | boolean | null
  type?: 'text' | 'date' | 'datetime' | 'email' | 'boolean'
  icon?: string
}) {
  const isEmpty = value === undefined || value === null || value === ''
  const display = isEmpty ? 'Not specified'
    : type === 'date'     ? formatTrackingDate(String(value))
    : type === 'datetime' ? formatTrackingDateTime(String(value))
    : type === 'boolean'  ? null
    : String(value)

  return (
    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {icon && <i className={cn(icon, 'text-must-green/70')} aria-hidden="true" />}
        {label}
      </div>
      {type === 'boolean' ? (
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border',
          value
            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
            : 'bg-gray-100 text-gray-600 border-gray-200',
        )}>
          <i className={cn('fas text-[10px]', value ? 'fa-check' : 'fa-times')} aria-hidden="true" />
          {value ? 'Yes' : 'No'}
        </span>
      ) : type === 'email' && value ? (
        <a href={`mailto:${value}`} className="text-sm font-medium text-must-green hover:underline">
          {String(value)}
        </a>
      ) : (
        <p className={cn('text-sm font-medium', isEmpty ? 'text-gray-400 italic' : 'text-gray-800')}>
          {display}
        </p>
      )}
    </div>
  )
}

export function StageDetailsModal({ curriculum, onClose, onUploadDocument, onAddNotes, onDownloadDocument }: Props) {
  const [tab, setTab] = useState<Tab>('overview')

  const stageKey  = (curriculum.selectedStage ?? curriculum.currentStage) as TrackingStageKey
  const stageData = curriculum.stages[stageKey]
  const stageInfo = TRACKING_STAGES.find((s) => s.key === stageKey)
  const si        = getStatusInfo(stageData?.status ?? 'pending')

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sdm-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 flex-shrink-0">
          <h2 id="sdm-title" className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <i className={cn(stageInfo?.icon ?? 'fas fa-info-circle', 'text-must-green')} aria-hidden="true" />
            {stageInfo?.title ?? 'Stage Details'}
            {curriculum.trackingId && (
              <span className="text-xs text-gray-400 font-normal font-mono ml-1">
                {curriculum.trackingId}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        {/* Curriculum summary */}
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50 flex-shrink-0">
          <h3 className="text-base font-bold text-gray-900 mb-2">
            {curriculum.displayTitle ?? curriculum.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {[
              { icon: 'fas fa-hashtag',       label: curriculum.trackingId,    cls: 'bg-gray-100 text-gray-600 border-gray-200' },
              curriculum.displayCode
                ? { icon: 'fas fa-code',       label: curriculum.displayCode,   cls: 'bg-must-blue/10 text-must-blue border-must-blue/20' }
                : null,
              { icon: 'fas fa-university',    label: curriculum.school,        cls: 'bg-must-blue/10 text-must-blue border-must-blue/20' },
              curriculum.academicLevel
                ? { icon: 'fas fa-graduation-cap', label: curriculum.academicLevel, cls: 'bg-amber-100 text-amber-700 border-amber-200' }
                : null,
              {
                icon: 'fas fa-flag',
                label: `${curriculum.priority ?? 'medium'} Priority`,
                cls: curriculum.priority === 'high'
                  ? 'bg-red-100 text-red-700 border-red-200'
                  : curriculum.priority === 'medium'
                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200',
              },
            ].filter(Boolean).map((item, i) => (
              <span
                key={i}
                className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border', item!.cls)}
              >
                <i className={item!.icon} aria-hidden="true" />{item!.label}
              </span>
            ))}
          </div>
        </div>

        {/* Stage status strip */}
        <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3 flex-shrink-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: si.bgColor, color: si.color }}
          >
            <i className={si.icon} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {curriculum.statusDisplayName ?? si.label}
            </p>
            <p className="text-xs text-gray-500">
              {curriculum.currentStageDisplayName ?? 'Current stage in the approval process'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white overflow-x-auto flex-shrink-0 scrollbar-thin" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors',
                tab === t.key
                  ? 'border-must-green text-must-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
              )}
            >
              <i className={t.icon} aria-hidden="true" />{t.label}
            </button>
          ))}
        </div>

        {/* Tab body */}
        <div className="flex-1 overflow-y-auto px-6 py-5" role="tabpanel">

          {tab === 'overview' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Field label="Tracking ID"   value={curriculum.trackingId}                                         icon="fas fa-hashtag" />
              <Field label="Status"        value={curriculum.statusDisplayName ?? curriculum.status}             icon="fas fa-info-circle" />
              <Field label="Stage"         value={curriculum.currentStageDisplayName ?? curriculum.currentStage} icon="fas fa-route" />
              <Field label="Priority"      value={curriculum.priority}                                           icon="fas fa-flag" />
              <Field label="Active"        value={curriculum.isActive}    type="boolean"                         icon="fas fa-power-off" />
              <Field label="Completed"     value={curriculum.isCompleted} type="boolean"                         icon="fas fa-check-circle" />
              <Field label="Days in Stage" value={curriculum.daysInCurrentStage}                                 icon="fas fa-calendar-day" />
              <Field label="Total Days"    value={curriculum.totalDays}                                          icon="fas fa-calendar-alt" />
            </div>
          )}

          {tab === 'details' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Field label="Display Name"      value={curriculum.displayTitle}              icon="fas fa-eye" />
              <Field label="Proposed Name"     value={curriculum.proposedCurriculumName}    icon="fas fa-book" />
              <Field label="Code"              value={curriculum.displayCode}               icon="fas fa-code" />
              <Field label="Proposed Code"     value={curriculum.proposedCurriculumCode}    icon="fas fa-code" />
              <Field label="Duration (Sem)"    value={curriculum.proposedDurationSemesters} icon="fas fa-clock" />
              <Field label="Academic Level"    value={curriculum.academicLevel}             icon="fas fa-graduation-cap" />
              {curriculum.curriculumDescription && (
                <div className="col-span-full">
                  <Field label="Description" value={curriculum.curriculumDescription} icon="fas fa-align-left" />
                </div>
              )}
            </div>
          )}

          {tab === 'people' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Field label="Initiated By"     value={curriculum.initiatedByName}                          icon="fas fa-user-plus" />
              <Field label="Initiator Email"  value={curriculum.initiatedByEmail}  type="email"           icon="fas fa-envelope" />
              <Field label="Current Assignee" value={curriculum.currentAssigneeName}                      icon="fas fa-user-check" />
              <Field label="Assignee Email"   value={curriculum.currentAssigneeEmail} type="email"        icon="fas fa-envelope" />
              <Field label="School"           value={curriculum.schoolName ?? curriculum.school}           icon="fas fa-university" />
              <Field label="Department"       value={curriculum.departmentName ?? curriculum.department}   icon="fas fa-building" />
            </div>
          )}

          {tab === 'timeline' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <Field label="Created"            value={curriculum.createdAt}               type="datetime" icon="fas fa-plus-circle" />
                <Field label="Last Updated"       value={curriculum.updatedAt}               type="datetime" icon="fas fa-edit" />
                <Field label="Submitted"          value={curriculum.submittedDate}           type="date"     icon="fas fa-paper-plane" />
                <Field label="Expected Done"      value={curriculum.expectedCompletionDate}  type="datetime" icon="fas fa-flag-checkered" />
                <Field label="Actual Done"        value={curriculum.actualCompletionDate}    type="datetime" icon="fas fa-check-circle" />
                <Field label="Proposed Effective" value={curriculum.proposedEffectiveDate}   type="date"     icon="fas fa-calendar-check" />
              </div>

              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                <i className="fas fa-route text-must-green" aria-hidden="true" /> Workflow Timeline
              </h4>
              <div className="relative pl-8">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
                {TRACKING_STAGES.map((stage) => {
                  const sd       = curriculum.stages[stage.key]
                  const isComp   = sd?.status === 'completed'
                  const isActive = stage.key === curriculum.currentStage
                  const isReview = ['under_review', 'on_hold', 'in_progress'].includes(sd?.status ?? '')
                  return (
                    <div key={stage.key} className="relative pb-5 last:pb-0">
                      <div className={cn(
                        'absolute -left-5 top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm',
                        isComp   ? 'bg-emerald-500 text-white' :
                        isReview ? 'bg-must-green text-white' :
                        'bg-gray-300 text-white',
                      )}>
                        {isComp
                          ? <i className="fas fa-check" aria-hidden="true" />
                          : <i className={stage.icon} aria-hidden="true" />}
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-gray-800">{stage.title}</span>
                          {isActive && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-must-green/10 text-must-green-darker border border-must-green/20">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 space-y-0.5">
                          {sd?.assignedTo    && <div>Assigned to: {sd.assignedTo}</div>}
                          {sd?.startedDate   && <div>Started: {formatTrackingDateTime(sd.startedDate)}</div>}
                          {sd?.completedDate && <div>Completed: {formatTrackingDateTime(sd.completedDate)}</div>}
                        </div>
                        {sd?.notes && (
                          <p className="mt-1 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                            {sd.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {tab === 'documents' && (
            <div>
              {stageData?.documents && stageData.documents.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {stageData.documents.map((doc, i) => (
                    <div
                      key={doc.id ?? i}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-must-green hover:bg-must-green/5 transition-all"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <i className="fas fa-file-alt text-must-green" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-800 truncate">
                          {doc.originalFilename ?? String(doc)}
                        </span>
                        {doc.versionNumber && doc.versionNumber > 1 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-must-green text-white">
                            v{doc.versionNumber}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onDownloadDocument(doc.id, doc.originalFilename)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all flex-shrink-0"
                      >
                        <i className="fas fa-download" aria-hidden="true" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <i className="fas fa-file-alt text-3xl mb-2 block opacity-30" aria-hidden="true" />
                  <p className="text-sm">No documents uploaded for this stage</p>
                </div>
              )}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={onUploadDocument}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-xl hover:-translate-y-px hover:shadow-soft transition-all"
                >
                  <i className="fas fa-upload" aria-hidden="true" /> Upload Document
                </button>
              </div>
            </div>
          )}

          {tab === 'notes' && (
            <div className="space-y-4">
              {curriculum.initialNotes && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <Field label="Initial Notes" value={curriculum.initialNotes} icon="fas fa-file-text" />
                </div>
              )}
              {stageData?.notes && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <Field label="Stage Notes" value={stageData.notes} icon="fas fa-sticky-note" />
                </div>
              )}
              {stageData?.feedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <Field label="Stage Feedback" value={stageData.feedback} icon="fas fa-comments" />
                </div>
              )}
              {!curriculum.initialNotes && !stageData?.notes && !stageData?.feedback && (
                <div className="text-center py-10 text-gray-400">
                  <i className="fas fa-sticky-note text-3xl mb-2 block opacity-30" aria-hidden="true" />
                  <p className="text-sm">No notes for this stage yet</p>
                </div>
              )}
              <button
                onClick={onAddNotes}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-must-green text-white rounded-xl hover:-translate-y-px hover:shadow-soft transition-all"
              >
                <i className="fas fa-plus" aria-hidden="true" /> Add Notes
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
