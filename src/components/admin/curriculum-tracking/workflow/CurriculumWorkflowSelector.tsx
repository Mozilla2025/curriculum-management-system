'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { getStageIndex, getStatusInfo } from '@/lib/tracking/utils'
import { WorkflowStage } from './WorkflowStage'

interface Props {
  curricula: CurriculumTracking[]
  isLoading: boolean
  onStageAction: (id: string | number, stageKey: string, action: string, payload?: { feedback?: string; returnToStage?: string | null }) => void
  onUploadDocument: (c: CurriculumTracking, stageKey: string) => void
  onAddNotes: (c: CurriculumTracking, stageKey: string) => void
  onEditTracking: (c: CurriculumTracking) => void
  onAssignTracking: (c: CurriculumTracking) => void
  onToggleStatus: (c: CurriculumTracking) => void
}

function ListItem({ curriculum, isSelected, onClick }: {
  curriculum: CurriculumTracking
  isSelected: boolean
  onClick: () => void
}) {
  const stageIdx  = getStageIndex(curriculum.currentStage)
  const pct       = Math.round(((stageIdx + 1) / TRACKING_STAGES.length) * 100)
  const stageData = curriculum.stages[curriculum.currentStage as keyof typeof curriculum.stages]
  const si        = getStatusInfo(stageData?.status ?? curriculum.status ?? 'pending')

  // Initials avatar from the title
  const initials = (curriculum.displayTitle ?? curriculum.title)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-3 py-3 border-l-[3px] transition-all group',
        isSelected
          ? 'border-l-must-green bg-emerald-50/60'
          : 'border-l-transparent hover:bg-gray-50 hover:border-l-gray-200',
      )}
    >
      <div className="flex items-start gap-3">
        {/* Initials avatar */}
        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5',
          isSelected
            ? 'bg-must-green text-white'
            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200',
        )}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-[13px] font-semibold line-clamp-1 leading-snug',
            isSelected ? 'text-must-green-darker' : 'text-gray-800',
          )}>
            {curriculum.displayTitle ?? curriculum.title}
          </p>

          <p className="text-[11px] text-gray-400 mt-0.5 truncate">
            {curriculum.trackingId}
            {curriculum.school ? ` · ${curriculum.school}` : ''}
          </p>

          {/* Stage + progress row */}
          <div className="flex items-center gap-2 mt-2">
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded-md border flex-shrink-0"
              style={{ backgroundColor: si.bgColor, color: si.color, borderColor: `${si.color}30` }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: si.color }}
              />
              {curriculum.currentStage.replace(/_/g, ' ')}
            </span>

            <div className="flex items-center gap-1 flex-1 min-w-0">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-must-green rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">{pct}%</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export function CurriculumWorkflowSelector({
  curricula, isLoading,
  onStageAction, onUploadDocument, onAddNotes,
  onEditTracking, onAssignTracking, onToggleStatus,
}: Props) {
  const [selectedId, setSelectedId]     = useState<string | number | null>(null)
  const [expandedStage, setExpandedStage] = useState<string | null>(null)

  useEffect(() => {
    if (curricula.length > 0 && !selectedId) {
      setSelectedId(curricula[0].id)
      setExpandedStage(curricula[0].currentStage)
    }
  }, [curricula, selectedId])

  const handleSelect = (c: CurriculumTracking) => {
    setSelectedId(c.id)
    setExpandedStage(c.currentStage)
  }

  const selected = curricula.find((c) => c.id === selectedId)

  if (isLoading && curricula.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-must-green rounded-full animate-spin" />
      </div>
    )
  }

  if (curricula.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <i className="fas fa-route text-4xl text-gray-300 mb-3 block opacity-50" aria-hidden="true" />
        <p className="text-sm text-gray-500">No trackings match the current filters.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] h-[680px]">

        {/* ── Left: curriculum list ─────────────────────────────────────── */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col h-full overflow-hidden">
          <div className="px-4 py-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-emerald-50/30 flex-shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <i className="fas fa-route text-emerald-500 text-[11px]" aria-hidden="true" />
                Curricula
              </p>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                {curricula.length}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-gray-100/80 pb-6">
              {curricula.map((c) => (
                <ListItem
                  key={c.id}
                  curriculum={c}
                  isSelected={c.id === selectedId}
                  onClick={() => handleSelect(c)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: workflow panel ─────────────────────────────────────── */}
        {selected ? (
          <div className="flex flex-col h-full overflow-hidden">

            {/* Panel header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60 flex-shrink-0">
              <h2 className="text-base font-bold text-gray-900 line-clamp-1">
                {selected.displayTitle ?? selected.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 flex-wrap">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded-md font-mono text-gray-600 text-[11px]">
                  {selected.trackingId}
                </code>
                {selected.schoolName ?? selected.school
                  ? <><span className="text-gray-300">·</span><span>{selected.schoolName ?? selected.school}</span></>
                  : null
                }
                {selected.academicLevel && (
                  <><span className="text-gray-300">·</span><span className="capitalize">{selected.academicLevel}</span></>
                )}
                {selected.daysInCurrentStage !== undefined && (
                  <><span className="text-gray-300">·</span>
                  <span className={cn(
                    'font-medium',
                    selected.daysInCurrentStage > 14 ? 'text-red-500' : 'text-gray-500',
                  )}>
                    {selected.daysInCurrentStage}d at current stage
                  </span></>
                )}
              </div>
            </div>

            {/* Stage cards */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 pt-4 pb-10">
                {TRACKING_STAGES.map((stage) => (
                  <WorkflowStage
                    key={stage.key}
                    curriculum={selected}
                    stage={stage}
                    isCurrentStage={selected.currentStage === stage.key}
                    isExpanded={expandedStage === stage.key}
                    onToggleExpand={() =>
                      setExpandedStage(expandedStage === stage.key ? null : stage.key)
                    }
                    onStageAction={onStageAction}
                    onUploadDocument={onUploadDocument}
                    onAddNotes={onAddNotes}
                    onEditTracking={onEditTracking}
                    onAssignTracking={onAssignTracking}
                    onToggleStatus={onToggleStatus}
                  />
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center py-16 text-sm text-gray-400">
            Select a curriculum to view its workflow
          </div>
        )}

      </div>
    </div>
  )
}
