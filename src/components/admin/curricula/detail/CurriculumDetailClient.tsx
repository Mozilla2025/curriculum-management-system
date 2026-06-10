'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Curriculum } from '@/types/curricula'
import { StatusTimeline } from './StatusTimeline'
import { ProgrammeInfoCard } from './ProgrammeInfoCard'
import { ActionCard } from './ActionCard'
import { CommentsHistory } from './CommentsHistory'
import { SuccessState } from './SuccessState'

type ActionType = 'approve' | 'sendBack' | 'reject'

interface SuccessResult {
  actionType: ActionType
  destinationStage: string
}

interface CurriculumDetailClientProps {
  curriculum: Curriculum
}

function deriveStageIndex(curriculum: Curriculum): number {
  if (curriculum.currentStageIndex !== undefined) return curriculum.currentStageIndex
  const statusMap: Record<string, number> = {
    draft: 0,
    pending: 1,
    under_review: 2,
    approved: 8,
    rejected: 1,
  }
  return statusMap[curriculum.status] ?? 0
}

const DESTINATION_BY_ACTION: Record<ActionType, Record<number, string>> = {
  approve: {
    1: 'Dean Committee',
    2: 'Senate',
    3: 'Quality Assurance',
    4: 'Vice Chancellor',
    5: 'CUE External Review',
  },
  sendBack: {
    2: 'School Board',
    3: 'Dean Committee',
    4: 'Dean Committee',
  },
  reject: {
    1: 'Department',
    2: 'Department',
    3: 'Department',
    4: 'Department',
    5: 'Quality Assurance',
  },
}

export function CurriculumDetailClient({ curriculum }: CurriculumDetailClientProps) {
  const stageIndex = deriveStageIndex(curriculum)
  const isRejected = curriculum.status === 'rejected'
  const [successResult, setSuccessResult] = useState<SuccessResult | null>(null)

  const handleActionConfirmed = (action: ActionType, _comment: string) => {
    const destinationStage =
      DESTINATION_BY_ACTION[action]?.[stageIndex] ?? 'the next stage'
    setSuccessResult({ actionType: action, destinationStage })
  }

  if (successResult) {
    return (
      <SuccessState
        curriculumTitle={curriculum.title}
        actionType={successResult.actionType}
        destinationStage={successResult.destinationStage}
      />
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back nav */}
      <Link
        href="/admin/admin-all-curricula"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Curriculums
      </Link>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: timeline */}
        <div className="lg:col-span-1">
          <StatusTimeline
            currentStageIndex={stageIndex}
            rejectedAtStage={isRejected ? stageIndex : undefined}
          />
        </div>

        {/* Right: info + actions */}
        <div className="lg:col-span-2 space-y-4">
          <ProgrammeInfoCard curriculum={curriculum} />
          <ActionCard
            curriculumTitle={curriculum.title}
            status={curriculum.status}
            currentStageIndex={stageIndex}
            onActionConfirmed={handleActionConfirmed}
          />
        </div>
      </div>

      {/* Bottom: comments / history */}
      <CommentsHistory />
    </div>
  )
}
