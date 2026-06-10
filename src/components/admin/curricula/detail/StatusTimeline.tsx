'use client'

import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

const WORKFLOW_STAGES = [
  {
    id: 'department',
    label: 'Department Submission',
    description: 'Curriculum created and submitted by department',
  },
  {
    id: 'school_board',
    label: 'School Board Review',
    description: 'Duplicate check and initial approval',
  },
  {
    id: 'dean_committee',
    label: 'Dean Committee',
    description: 'Detailed review and error assessment',
  },
  {
    id: 'senate',
    label: 'Senate',
    description: 'Final academic governance review',
  },
  {
    id: 'quality_assurance',
    label: 'Quality Assurance',
    description: 'CUE compliance and standards check',
  },
  {
    id: 'vice_chancellor',
    label: 'Vice Chancellor',
    description: 'Final approval and CUE payment',
  },
  {
    id: 'cue_review',
    label: 'CUE External Review',
    description: 'External review by Commission for University Education',
  },
  {
    id: 'site_inspection',
    label: 'Site Inspection',
    description: 'QA site visit and physical verification',
  },
  {
    id: 'accredited',
    label: 'Accredited',
    description: 'Curriculum fully accredited and active',
  },
]

interface StatusTimelineProps {
  currentStageIndex: number
  rejectedAtStage?: number
}

export function StatusTimeline({ currentStageIndex, rejectedAtStage }: StatusTimelineProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-6">Workflow Progress</h2>

      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gray-200" />

        <ol className="space-y-5">
          {WORKFLOW_STAGES.map((stage, index) => {
            const isCompleted = index < currentStageIndex
            const isCurrent = index === currentStageIndex
            const isRejected = rejectedAtStage !== undefined && index === rejectedAtStage

            return (
              <li key={stage.id} className="relative flex gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'relative z-10 flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center',
                    isRejected
                      ? 'bg-red-50 border-red-400'
                      : isCompleted
                        ? 'bg-must-green border-must-green'
                        : isCurrent
                          ? 'bg-white border-must-green'
                          : 'bg-white border-gray-200'
                  )}
                >
                  {isRejected ? (
                    <i className="fas fa-times text-xs text-red-500" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 text-must-green" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                </div>

                {/* Text */}
                <div className="pt-1">
                  <p
                    className={cn(
                      'text-sm font-semibold leading-tight',
                      isRejected
                        ? 'text-red-600'
                        : isCompleted || isCurrent
                          ? 'text-gray-900'
                          : 'text-gray-400'
                    )}
                  >
                    {stage.label}
                    {isCurrent && (
                      <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-must-green bg-must-green/10 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                    {isRejected && (
                      <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        Returned
                      </span>
                    )}
                  </p>
                  <p
                    className={cn(
                      'text-xs mt-0.5',
                      isCompleted || isCurrent ? 'text-gray-500' : 'text-gray-300'
                    )}
                  >
                    {stage.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
