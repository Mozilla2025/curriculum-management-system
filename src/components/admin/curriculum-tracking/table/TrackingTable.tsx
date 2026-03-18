'use client'

import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { getStatusBadgeClass, getStageIndex, formatTrackingDate, truncateText, getPriorityBadgeClass } from '@/lib/tracking/utils'

interface Props {
  curricula: CurriculumTracking[]
  isLoading: boolean
  currentViewMode?: string
  currentDataSource?: string
  onStageAction: (id: string | number, stageKey: string, action: string) => void
  onViewDetails: (c: CurriculumTracking) => void
  onEditTracking: (c: CurriculumTracking) => void
  onAssignTracking: (c: CurriculumTracking) => void
  onToggleStatus: (c: CurriculumTracking) => void
}

function getProgress(c: CurriculumTracking) {
  const idx = getStageIndex(c.currentStage)
  return ((idx + 1) / TRACKING_STAGES.length) * 100
}

export function TrackingTable({ curricula, isLoading, currentDataSource, onStageAction, onViewDetails, onEditTracking, onAssignTracking, onToggleStatus }: Props) {
  if (isLoading) return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-16 flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-must-green rounded-full animate-spin" role="status" />
      <p className="text-sm text-gray-500 font-medium">Loading curricula...</p>
    </div>
  )

  if (curricula.length === 0) return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft text-center py-16">
      <i className="fas fa-table text-4xl text-gray-300 mb-3 block opacity-50" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-gray-700 mb-1">No Curricula Found</h3>
      <p className="text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <i className="fas fa-table text-must-green" aria-hidden="true" /> Curriculum Tracking Table
        </h3>
        <button onClick={() => { if (typeof window !== 'undefined') window.print() }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all">
          <i className="fas fa-print" aria-hidden="true" /> Print
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse" aria-label="Curriculum trackings">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {['Curriculum', 'Institution', 'People', 'Stage', 'Progress', 'Status', 'Dates', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {curricula.map((c) => {
              const progress  = getProgress(c)
              const stageName = TRACKING_STAGES.find((s) => s.key === c.currentStage)?.title ?? c.currentStage
              const isActive  = ['under_review', 'pending_approval'].includes(c.status)
              const isOnHold  = c.status === 'on_hold'

              return (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-must-green/5 transition-colors">
                  {/* Curriculum */}
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-gray-900 leading-snug" title={c.title}>{truncateText(c.title, 40)}</span>
                      <code className="text-[11px] text-gray-400 font-mono">{c.trackingId}</code>
                      {c.proposedCurriculumCode && <span className="text-[11px] text-gray-400"><strong>Code:</strong> {c.proposedCurriculumCode}</span>}
                    </div>
                  </td>

                  {/* Institution */}
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-col gap-0.5 text-xs">
                      <span className="font-medium text-gray-800 flex items-center gap-1">
                        <i className="fas fa-university text-must-blue/60 w-3" aria-hidden="true" />{c.school}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <i className="fas fa-building text-gray-300 w-3" aria-hidden="true" />{c.department}
                      </span>
                      {c.academicLevel && <span className="text-gray-400">{c.academicLevel}</span>}
                    </div>
                  </td>

                  {/* People */}
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-col gap-1.5 text-xs">
                      {c.initiatedByName && (
                        <div>
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase mb-0.5">
                            <i className="fas fa-user-plus text-must-green/70 w-3" aria-hidden="true" /> Initiated
                          </div>
                          <span className="text-gray-700">{c.initiatedByName}</span>
                        </div>
                      )}
                      {c.currentAssigneeName && (
                        <div>
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 uppercase mb-0.5">
                            <i className="fas fa-user-check text-amber-500/70 w-3" aria-hidden="true" /> Assigned
                          </div>
                          <span className="text-gray-700">{c.currentAssigneeName}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Stage */}
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-must-green/10 text-must-green-darker border border-must-green/20">
                        {stageName}
                      </span>
                      <span className="text-[11px] text-gray-400">{c.daysInCurrentStage ?? 0}d in stage</span>
                    </div>
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-4 align-top min-w-[120px]">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-800">{Math.round(progress)}%</span>
                        <span className="text-gray-400">{c.totalDays ?? 0}d</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-must-green to-must-green-dark rounded-full transition-all duration-700"
                          style={{ width: `${progress}%` }}
                          role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      {c.priority && (
                        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full', getPriorityBadgeClass(c.priority))}>
                          <i className="fas fa-flag text-[9px]" aria-hidden="true" />
                          {c.priority.charAt(0).toUpperCase() + c.priority.slice(1)}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-col gap-1">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full', getStatusBadgeClass(c.status))}>
                        {c.statusDisplayName ?? c.status.replace(/_/g, ' ')}
                      </span>
                      <div className="flex gap-1 flex-wrap">
                        {c.isActive    && <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200"><i className="fas fa-check text-[8px]" />Active</span>}
                        {c.isCompleted && <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200"><i className="fas fa-check-circle text-[8px]" />Done</span>}
                      </div>
                    </div>
                  </td>

                  {/* Dates */}
                  <td className="px-4 py-4 align-top text-xs text-gray-500">
                    <div className="flex flex-col gap-0.5">
                      <span><i className="fas fa-play text-must-green/60 w-3 mr-1" aria-hidden="true" />{formatTrackingDate(c.submittedDate)}</span>
                      <span><i className="fas fa-clock text-amber-400/80 w-3 mr-1" aria-hidden="true" />{formatTrackingDate(c.lastUpdated)}</span>
                      {c.expectedCompletionDate && <span><i className="fas fa-flag-checkered text-emerald-500/60 w-3 mr-1" aria-hidden="true" />{formatTrackingDate(c.expectedCompletionDate)}</span>}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-col gap-1.5 min-w-[110px]">
                      <button onClick={() => onViewDetails(c)}
                        className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green hover:-translate-y-px hover:shadow-soft transition-all">
                        <i className="fas fa-eye" aria-hidden="true" /> Details
                      </button>
                      {isActive && (
                        <>
                          <button onClick={() => onStageAction(c.id, c.currentStage, 'approve')}
                            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 hover:-translate-y-px hover:shadow-soft transition-all">
                            <i className="fas fa-check" aria-hidden="true" /> Approve
                          </button>
                          <button onClick={() => onStageAction(c.id, c.currentStage, 'hold')}
                            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 hover:-translate-y-px hover:shadow-soft transition-all">
                            <i className="fas fa-pause" aria-hidden="true" /> Hold
                          </button>
                          <button onClick={() => onStageAction(c.id, c.currentStage, 'reject')}
                            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 hover:-translate-y-px hover:shadow-soft transition-all">
                            <i className="fas fa-times" aria-hidden="true" /> Reject
                          </button>
                        </>
                      )}
                      {isOnHold && (
                        <button onClick={() => onStageAction(c.id, c.currentStage, 'resume')}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-lg hover:-translate-y-px hover:shadow-soft transition-all">
                          <i className="fas fa-play" aria-hidden="true" /> Resume
                        </button>
                      )}
                      <div className="pt-1.5 border-t border-gray-100 flex flex-col gap-1">
                        <button onClick={() => onEditTracking(c)}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green hover:-translate-y-px transition-all">
                          <i className="fas fa-edit" aria-hidden="true" /> Edit
                        </button>
                        <button onClick={() => onAssignTracking(c)}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green hover:-translate-y-px transition-all">
                          <i className="fas fa-user-plus" aria-hidden="true" /> Assign
                        </button>
                        <button onClick={() => onToggleStatus(c)}
                          className={cn('flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg hover:-translate-y-px transition-all',
                            c.isActive ? 'bg-white border border-amber-300 text-amber-600 hover:bg-amber-50' : 'bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50')}>
                          <i className={cn('fas', c.isActive ? 'fa-pause' : 'fa-play')} aria-hidden="true" />
                          {c.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden">
        {curricula.map((c) => {
          const progress  = getProgress(c)
          const stageName = TRACKING_STAGES.find((s) => s.key === c.currentStage)?.title ?? c.currentStage
          return (
            <div key={c.id} className="border-b border-gray-100 last:border-0 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2">{c.title}</p>
                  <code className="text-[11px] text-gray-400 font-mono">#{c.trackingId}</code>
                </div>
                <span className={cn('flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full', getStatusBadgeClass(c.status))}>
                  {c.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="space-y-2 text-xs mb-3">
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-university text-must-blue/60 w-3.5" aria-hidden="true" />
                  <span className="text-gray-600">{c.school}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-route text-must-green/70 w-3.5" aria-hidden="true" />
                  <span className="text-gray-600">{stageName} • {c.daysInCurrentStage ?? 0}d</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-semibold text-gray-700">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-must-green to-must-green-dark rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => onViewDetails(c)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-must-green hover:text-must-green transition-all">
                  <i className="fas fa-eye" aria-hidden="true" /> Details
                </button>
                {['under_review', 'pending_approval'].includes(c.status) && (
                  <>
                    <button onClick={() => onStageAction(c.id, c.currentStage, 'approve')}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all">
                      <i className="fas fa-check" aria-hidden="true" /> Approve
                    </button>
                    <button onClick={() => onStageAction(c.id, c.currentStage, 'reject')}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all">
                      <i className="fas fa-times" aria-hidden="true" /> Reject
                    </button>
                  </>
                )}
                {c.status === 'on_hold' && (
                  <button onClick={() => onStageAction(c.id, c.currentStage, 'resume')}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-lg transition-all">
                    <i className="fas fa-play" aria-hidden="true" /> Resume
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
        <span>Showing <strong className="text-gray-800">{curricula.length}</strong> tracking{curricula.length !== 1 ? 's' : ''}</span>
        {currentDataSource && <span className="text-gray-400">Source: <strong>{currentDataSource.replace(/-/g, ' ')}</strong></span>}
      </div>
    </div>
  )
}
