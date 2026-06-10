'use client'

import { cn } from '@/lib/utils'
import type { CurriculumTracking, TrackingStageKey } from '@/types/tracking'
import { TRACKING_STAGES } from '@/lib/tracking/constants'
import { getStatusInfo, getStatusBadgeClass, getPriorityBadgeClass } from '@/lib/tracking/utils'

function WorkflowStepper({ curriculum }: { curriculum: CurriculumTracking }) {
  const currentIdx = TRACKING_STAGES.findIndex((s) => s.key === curriculum.currentStage)

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-1.5">
        <i className="fas fa-route text-must-green" aria-hidden="true" />
        Workflow Progress
      </p>
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-3.5 h-0.5 bg-gray-200" style={{ left: '3.5%', right: '3.5%' }} />
        {/* Completed line */}
        {currentIdx > 0 && (
          <div
            className="absolute top-3.5 h-0.5 bg-emerald-400 transition-all duration-500"
            style={{
              left: '3.5%',
              width: `calc(${(currentIdx / (TRACKING_STAGES.length - 1)) * 93}%)`,
            }}
          />
        )}
        <div className="relative flex justify-between">
          {TRACKING_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIdx
            const isCurrent   = idx === currentIdx

            return (
              <div key={stage.key} className="flex flex-col items-center z-10" style={{ width: `${100 / TRACKING_STAGES.length}%` }}>
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center border-2 text-[10px] font-bold transition-all',
                  isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                  isCurrent   ? 'bg-must-green border-must-green text-white ring-4 ring-must-green/20' :
                                'bg-white border-gray-200 text-gray-400',
                )}>
                  {isCompleted
                    ? <i className="fas fa-check text-[9px]" aria-hidden="true" />
                    : <span>{idx + 1}</span>
                  }
                </div>
                <p className={cn(
                  'text-center mt-2 leading-tight px-0.5 text-[9px] font-medium',
                  isCurrent   ? 'text-must-green-darker font-semibold' :
                  isCompleted ? 'text-emerald-600' :
                                'text-gray-400',
                )}>
                  {stage.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface Props { curriculum: CurriculumTracking }

export function OverviewTab({ curriculum }: Props) {
  const stageKey  = curriculum.currentStage as TrackingStageKey
  const stageData = curriculum.stages[stageKey]
  const stageInfo = TRACKING_STAGES.find((s) => s.key === stageKey)
  const si        = getStatusInfo(stageData?.status ?? curriculum.status ?? 'pending')

  return (
    <div className="space-y-4">
      <WorkflowStepper curriculum={curriculum} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Current Stage Card */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <i className="fas fa-map-marker-alt text-must-green" aria-hidden="true" />
            Current Stage
          </p>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
              style={{ backgroundColor: si.bgColor, color: si.color }}
            >
              <i className={cn(stageInfo?.icon ?? 'fas fa-route')} aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">
                {curriculum.currentStageDisplayName ?? stageInfo?.title}
              </p>
              {stageInfo?.description && (
                <p className="text-xs text-gray-500 mt-0.5">{stageInfo.description}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stageData?.assignedTo && (
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Assigned To</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{stageData.assignedTo}</p>
              </div>
            )}
            {curriculum.daysInCurrentStage !== undefined && (
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Days at Stage</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{curriculum.daysInCurrentStage} days</p>
              </div>
            )}
            {stageData?.startedDate && (
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Stage Started</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {new Date(stageData.startedDate).toLocaleDateString('en-CA', { dateStyle: 'medium' })}
                </p>
              </div>
            )}
            {curriculum.totalDays !== undefined && (
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Total Days</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{curriculum.totalDays} days</p>
              </div>
            )}
          </div>

          {stageData?.notes && (
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
              <p className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1">
                <i className="fas fa-sticky-note" aria-hidden="true" />
                Stage Note
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">{stageData.notes}</p>
            </div>
          )}
        </div>

        {/* Metrics sidebar */}
        <div className="space-y-3">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <i className="fas fa-info-circle text-must-green" aria-hidden="true" />
              Status
            </p>
            <span className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border',
              getStatusBadgeClass(stageData?.status ?? curriculum.status),
            )}>
              <i className={cn(si.icon, 'text-[10px]')} aria-hidden="true" />
              {curriculum.statusDisplayName ?? si.label}
            </span>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <i className="fas fa-flag text-must-green" aria-hidden="true" />
              Priority
            </p>
            <span className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border capitalize',
              getPriorityBadgeClass(curriculum.priority),
            )}>
              {curriculum.priority ?? 'medium'}
            </span>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <i className="fas fa-power-off text-must-green" aria-hidden="true" />
              State
            </p>
            <div className="flex flex-col gap-2">
              <span className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border',
                curriculum.isActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-gray-50 text-gray-500 border-gray-200',
              )}>
                <i className={cn('fas text-[10px]', curriculum.isActive ? 'fa-check' : 'fa-times')} aria-hidden="true" />
                {curriculum.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border',
                curriculum.isCompleted
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-gray-50 text-gray-500 border-gray-200',
              )}>
                <i className={cn('fas text-[10px]', curriculum.isCompleted ? 'fa-check-circle' : 'fa-hourglass-half')} aria-hidden="true" />
                {curriculum.isCompleted ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
