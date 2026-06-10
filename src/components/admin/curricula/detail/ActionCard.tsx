'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CurriculumStatus } from '@/types/curricula'
import { ConfirmationModal } from './ConfirmationModal'

type ActionType = 'approve' | 'sendBack' | 'reject'

interface StageConfig {
  approve?: { label: string; destination: string }
  sendBack?: { label: string; destination: string }
  reject?: { label: string; destination: string }
}

const STAGE_CONFIG: Record<number, StageConfig> = {
  1: {
    approve: { label: 'Approve', destination: 'Dean Committee' },
    reject: { label: 'Reject — Duplicate Found', destination: 'Department' },
  },
  2: {
    approve: { label: 'Approve', destination: 'Senate' },
    sendBack: { label: 'Send Back', destination: 'School Board' },
    reject: { label: 'Reject', destination: 'Department' },
  },
  3: {
    approve: { label: 'Approve', destination: 'Quality Assurance' },
    sendBack: { label: 'Send Back', destination: 'Dean Committee' },
    reject: { label: 'Reject', destination: 'Department' },
  },
  4: {
    approve: { label: 'Approve', destination: 'Vice Chancellor' },
    sendBack: { label: 'Send Back', destination: 'Dean Committee' },
    reject: { label: 'Reject', destination: 'Department' },
  },
  5: {
    approve: { label: 'Approve & Initiate CUE Payment', destination: 'CUE External Review' },
    reject: { label: 'Return to Quality Assurance', destination: 'Quality Assurance' },
  },
}

interface ActionCardProps {
  curriculumTitle: string
  status: CurriculumStatus
  currentStageIndex: number
  onActionConfirmed: (action: ActionType, comment: string) => void
}

export function ActionCard({
  curriculumTitle,
  status,
  currentStageIndex,
  onActionConfirmed,
}: ActionCardProps) {
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')

  const config = STAGE_CONFIG[currentStageIndex]
  const requiresComment = pendingAction === 'reject' || pendingAction === 'sendBack'
  const destination =
    pendingAction && config?.[pendingAction]?.destination
      ? config[pendingAction]!.destination
      : ''

  const handleActionClick = (action: ActionType) => {
    setCommentError('')
    if ((action === 'reject' || action === 'sendBack') && !comment.trim()) {
      setCommentError('A reason is required for this action.')
      setPendingAction(action)
      return
    }
    setPendingAction(action)
  }

  const handleConfirm = (_reason?: string) => {
    if (!pendingAction) return
    onActionConfirmed(pendingAction, comment)
    setPendingAction(null)
    setComment('')
    setCommentError('')
  }

  const handleCancel = () => {
    setPendingAction(null)
    setCommentError('')
  }

  // Attempt to open modal — validates first if reject/sendBack
  const attemptAction = (action: ActionType) => {
    setCommentError('')
    if ((action === 'reject' || action === 'sendBack') && !comment.trim()) {
      setCommentError('A reason is required for this action.')
      return
    }
    setPendingAction(action)
  }

  if (status === 'approved') {
    return (
      <div className="bg-white rounded-xl border border-must-green/30 shadow-sm p-6">
        <div className="flex items-center gap-3 text-must-green">
          <CheckCircle2 className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Fully Accredited</h3>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          This curriculum has completed all stages and is officially accredited.
        </p>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="bg-white rounded-xl border border-red-200 shadow-sm p-6">
        <div className="flex items-center gap-3 text-red-600">
          <XCircle className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Rejected</h3>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          This curriculum was rejected. The department may submit a revised version.
        </p>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <p className="text-sm text-gray-400 text-center">
          No actions available at this stage for your role.
        </p>
      </div>
    )
  }

  const showCommentField = !!(config.reject || config.sendBack)

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-5">
          What would you like to do?
        </h3>

        {/* Comment / reason field */}
        {showCommentField && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {config.approve
                ? 'Comment (optional)'
                : 'Reason'}
              {!config.approve && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
                if (e.target.value.trim()) setCommentError('')
              }}
              rows={3}
              placeholder={
                config.approve
                  ? 'Add a comment or feedback...'
                  : 'Provide a reason for this action...'
              }
              className={cn(
                'w-full px-3 py-2.5 text-sm border rounded-lg resize-none transition-all',
                'focus:outline-none focus:ring-2',
                commentError
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-must-green focus:ring-must-green/10',
                'text-gray-700 placeholder:text-gray-400'
              )}
            />
            {commentError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <i className="fas fa-exclamation-circle" />
                {commentError}
              </p>
            )}
          </div>
        )}

        {/* Action buttons — horizontal on sm+, stacked on mobile */}
        <div className="flex flex-col sm:flex-row gap-2">
          {config.approve && (
            <button
              onClick={() => attemptAction('approve')}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-must-green hover:bg-must-green-dark hover:-translate-y-px hover:shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              {config.approve.label}
            </button>
          )}

          {config.sendBack && (
            <button
              onClick={() => attemptAction('sendBack')}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 hover:-translate-y-px transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {config.sendBack.label}
            </button>
          )}

          {config.reject && (
            <button
              onClick={() => attemptAction('reject')}
              className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 hover:-translate-y-px transition-all"
            >
              <XCircle className="w-4 h-4" />
              {config.reject.label}
            </button>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={pendingAction !== null && !commentError}
        actionType={pendingAction ?? 'approve'}
        curriculumTitle={curriculumTitle}
        destinationStage={destination}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}
