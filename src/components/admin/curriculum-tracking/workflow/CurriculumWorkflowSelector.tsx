'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { CurriculumWorkflowCard } from './CurriculumWorkflow'
import { getStageIndex } from '@/lib/tracking/utils'

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

export function CurriculumWorkflowSelector({
  curricula,
  isLoading,
  onStageAction,
  onViewDetails,
  onUploadDocument,
  onAddNotes,
  onEditTracking,
  onAssignTracking,
  onToggleStatus,
}: Props) {
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string | number | null>(null)

  // Set default to first curriculum on load
  useEffect(() => {
    if (curricula.length > 0 && !selectedCurriculumId) {
      setSelectedCurriculumId(curricula[0].id)
    }
  }, [curricula, selectedCurriculumId])

  const selectedCurriculum = curricula.find((c) => c.id === selectedCurriculumId)

  if (isLoading && curricula.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-must-green rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Loading workflow...</p>
        </div>
      </div>
    )
  }

  if (curricula.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <i className="fas fa-route text-4xl text-gray-300 mb-3 block opacity-50" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-gray-700 mb-1">No Curriculum Trackings</h3>
        <p className="text-sm text-gray-500">No trackings match the current filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Curricula List/Selector */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <i className="fas fa-list text-must-green" aria-hidden="true" />
            Curricula Tracking List ({curricula.length})
          </h3>
        </div>

        {/* Horizontal scroll for curricula */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 p-4 min-w-min">
            {curricula.map((curriculum) => (
              <button
                key={curriculum.id}
                onClick={() => setSelectedCurriculumId(curriculum.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all group w-60',
                  selectedCurriculumId === curriculum.id
                    ? 'border-must-green bg-must-green/5 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                )}
              >
                <div className="text-left">
                  <div
                    className={cn(
                      'font-semibold text-sm line-clamp-1',
                      selectedCurriculumId === curriculum.id ? 'text-gray-900' : 'text-gray-700'
                    )}
                  >
                    {curriculum.displayTitle ?? curriculum.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 flex-wrap">
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-600 truncate">
                      {curriculum.trackingId}
                    </code>
                    <span className="text-gray-300">•</span>
                    <span className="truncate">{curriculum.school}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-must-green rounded-full transition-all"
                        style={{
                          width: `${
                            ((getStageIndex(curriculum.currentStage) + 1) /
                              TRACKING_STAGES.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                      {curriculum.currentStage.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Curriculum Workflow */}
      {selectedCurriculum && (
        <div key={selectedCurriculum.id}>
          <CurriculumWorkflowCard
            curricula={curricula}
            curriculum={selectedCurriculum}
            isLoading={isLoading}
            onStageAction={onStageAction}
            onViewDetails={onViewDetails}
            onUploadDocument={onUploadDocument}
            onAddNotes={onAddNotes}
            onEditTracking={onEditTracking}
            onAssignTracking={onAssignTracking}
            onToggleStatus={onToggleStatus}
          />
        </div>
      )}
    </div>
  )
}
