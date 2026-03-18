'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { getStageIndex } from '@/lib/tracking/utils'
import { WorkflowStage } from './WorkflowStage'

interface Props {
  curricula: CurriculumTracking[]
  isLoading: boolean
  onStageAction: (id: string | number, stageKey: string, action: string, payload?: { feedback?: string; returnToStage?: string | null }) => void
  onViewDetails: (c: CurriculumTracking) => void
  onUploadDocument: (c: CurriculumTracking, stageKey: string) => void
  onAddNotes: (c: CurriculumTracking, stageKey: string) => void
  onEditTracking: (c: CurriculumTracking) => void
  onAssignTracking: (c: CurriculumTracking) => void
  onToggleStatus: (c: CurriculumTracking) => void
}

type WorkflowView = 'stages' | 'table'

function ProgressMap({ curriculum }: { curriculum: CurriculumTracking }) {
  const currentIdx = getStageIndex(curriculum.currentStage)
  const pct = Math.round(((currentIdx + 1) / TRACKING_STAGES.length) * 100)

  return (
    <div className="mb-4 p-4 bg-white border border-gray-200 rounded-xl shadow-soft">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Workflow Progress</h3>
        <span className="text-sm font-bold text-must-green">{pct}%</span>
      </div>
      <div className="flex items-center gap-1 mb-2">
        {TRACKING_STAGES.map((s, i) => {
          const done    = i < currentIdx
          const current = i === currentIdx
          return (
            <div key={s.key} className="flex items-center flex-1">
              <div className={cn('h-2 flex-1 rounded-full transition-all duration-500',
                done    ? 'bg-must-green' :
                current ? 'bg-gradient-to-r from-must-green to-must-green/50' :
                'bg-gray-200')} title={s.title} />
              {i < TRACKING_STAGES.length - 1 && (
                <div className={cn('w-1 h-1 rounded-full flex-shrink-0 mx-0.5', done ? 'bg-must-green' : 'bg-gray-300')} />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{TRACKING_STAGES[0].title}</span>
        <span className="text-must-green-darker font-medium">{TRACKING_STAGES[currentIdx]?.title ?? 'Complete'}</span>
        <span>{TRACKING_STAGES[TRACKING_STAGES.length - 1].title}</span>
      </div>
    </div>
  )
}

export function CurriculumWorkflowCard({
  curriculum, onStageAction, onViewDetails, onUploadDocument, onAddNotes,
  onEditTracking, onAssignTracking, onToggleStatus,
}: Props & { curriculum: CurriculumTracking }) {
  const [expandedStage, setExpandedStage] = useState<string | null>(curriculum.currentStage)
  const [view, setView] = useState<WorkflowView>('stages')

  const urgentStages = TRACKING_STAGES.filter((s) => {
    const d = curriculum.stages[s.key]
    return d && ['under_review', 'on_hold'].includes(d.status ?? '')
  })

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-soft overflow-hidden mb-6">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
        <div className="flex items-start justify-between gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900 line-clamp-1">{curriculum.displayTitle ?? curriculum.title}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-gray-500">
              <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-600 truncate">{curriculum.trackingId}</code>
              <span className="text-gray-300">•</span>
              <i className="fas fa-university text-must-blue/70 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{curriculum.school}</span>
              {curriculum.academicLevel && <><span className="text-gray-300">•</span><span className="truncate">{curriculum.academicLevel}</span></>}
            </div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            {(['stages','table'] as WorkflowView[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={cn('px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap',
                  view === v ? 'bg-must-green text-white border-must-green' : 'bg-white text-gray-500 border-gray-200 hover:border-must-green hover:text-must-green')}>
                <i className={cn('fas mr-1', v === 'stages' ? 'fa-sitemap' : 'fa-table')} aria-hidden="true" />
                {v === 'stages' ? 'Stages' : 'Table'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Quick actions for urgent */}
        {urgentStages.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-red-800 mb-2">
              <i className="fas fa-exclamation-triangle text-red-500 animate-pulse" aria-hidden="true" />
              Action Required ({urgentStages.length} stage{urgentStages.length > 1 ? 's' : ''})
            </h4>
            <div className="space-y-2">
              {urgentStages.map((s) => (
                <div key={s.key} className="flex items-center justify-between p-2 bg-white border border-red-100 rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <i className={cn(s.icon, 'text-red-500 text-xs')} aria-hidden="true" />
                    <span className="text-xs font-semibold text-gray-700 truncate">{s.title}</span>
                    <span className="text-[10px] text-gray-400">{curriculum.daysInCurrentStage ?? 0}d</span>
                  </div>
                  <button onClick={() => { setExpandedStage(s.key); setView('stages') }}
                    className="flex-shrink-0 px-2.5 py-1 text-[10px] font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <ProgressMap curriculum={curriculum} />

        {view === 'stages' && (
          <div>
            {TRACKING_STAGES.map((stage) => (
              <WorkflowStage
                key={stage.key}
                curriculum={curriculum}
                stage={stage}
                isCurrentStage={curriculum.currentStage === stage.key}
                isExpanded={expandedStage === stage.key}
                onToggleExpand={() => setExpandedStage(expandedStage === stage.key ? null : stage.key)}
                onStageAction={onStageAction}
                onViewDetails={onViewDetails}
                onUploadDocument={onUploadDocument}
                onAddNotes={onAddNotes}
                onEditTracking={onEditTracking}
                onAssignTracking={onAssignTracking}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </div>
        )}

        {view === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Stage', 'Status', 'Assigned', 'Started', 'Completed'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRACKING_STAGES.map((stage) => {
                  const d = curriculum.stages[stage.key]
                  const isCurrent = curriculum.currentStage === stage.key
                  return (
                    <tr key={stage.key} className={cn('border-b border-gray-50 hover:bg-must-green/5 transition-colors',
                      isCurrent && 'bg-must-green/5 border-l-2 border-l-must-green')}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <i className={cn(stage.icon, 'text-gray-400 text-xs w-4')} aria-hidden="true" />
                          <span className="font-medium text-gray-800 text-xs">{stage.title}</span>
                          {isCurrent && <span className="w-2 h-2 rounded-full bg-must-green animate-pulse flex-shrink-0" />}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {d?.status ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                            {d.status.replace(/_/g, ' ')}
                          </span>
                        ) : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{d?.assignedTo ?? '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{d?.startedDate ? new Date(d.startedDate).toLocaleDateString('en-CA') : '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{d?.completedDate ? new Date(d.completedDate).toLocaleDateString('en-CA') : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export function CurriculumWorkflow({ curricula, isLoading, ...handlers }: Props) {
  if (isLoading && curricula.length === 0) return (
    <div className="flex items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-must-green rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500 font-medium">Loading workflow...</p>
      </div>
    </div>
  )

  if (curricula.length === 0) return (
    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
      <i className="fas fa-route text-4xl text-gray-300 mb-3 block opacity-50" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-gray-700 mb-1">No Curriculum Trackings</h3>
      <p className="text-sm text-gray-500">No trackings match the current filters.</p>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 font-medium">
          <span className="font-bold text-gray-800">{curricula.length}</span> tracking{curricula.length !== 1 ? 's' : ''} shown
        </p>
      </div>
      {curricula.map((c) => (
        <CurriculumWorkflowCard key={c.id} curriculum={c} curricula={curricula} isLoading={isLoading} {...handlers} />
      ))}
    </div>
  )
}
