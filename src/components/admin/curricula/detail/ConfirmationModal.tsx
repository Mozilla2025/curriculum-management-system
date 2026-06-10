'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

type ActionType = 'approve' | 'sendBack' | 'reject'

interface ConfirmationModalProps {
  isOpen: boolean
  actionType: ActionType
  curriculumTitle: string
  destinationStage: string
  requiresReason?: boolean
  onConfirm: (reason?: string) => void
  onCancel: () => void
}

const ACTION_VERB: Record<ActionType, string> = {
  approve: 'approve',
  sendBack: 'send back',
  reject: 'reject',
}

const ACTION_CONSEQUENCE: Record<ActionType, (dest: string) => string> = {
  approve: (dest) => `This will send it to ${dest}.`,
  sendBack: (dest) => `It will be returned to ${dest} for revisions.`,
  reject: () => 'This curriculum will be rejected.',
}

export function ConfirmationModal({
  isOpen,
  actionType,
  curriculumTitle,
  destinationStage,
  requiresReason = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const confirmBtnRef = useRef<HTMLButtonElement>(null)
  const [reason, setReason] = useState('')
  const [reasonError, setReasonError] = useState('')

  useEffect(() => {
    if (isOpen) confirmBtnRef.current?.focus()
    if (!isOpen) {
      setReason('')
      setReasonError('')
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  const verb = ACTION_VERB[actionType]
  const consequence = ACTION_CONSEQUENCE[actionType](destinationStage)
  const isDestructive = actionType === 'reject'

  const handleConfirm = () => {
    if (requiresReason && !reason.trim()) {
      setReasonError('A reason is required.')
      return
    }
    onConfirm(reason || undefined)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 id="confirm-modal-title" className="text-base font-bold text-gray-900">
            Confirm action
          </h2>
          <button
            onClick={onCancel}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-700 leading-relaxed">
          You are about to{' '}
          <strong className={isDestructive ? 'text-red-600' : 'text-gray-900'}>{verb}</strong>{' '}
          <strong className="text-gray-900">&ldquo;{curriculumTitle}&rdquo;</strong>.{' '}
          {consequence} Are you sure?
        </p>

        {/* Reason field — shown when requiresReason is true */}
        {requiresReason && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                if (e.target.value.trim()) setReasonError('')
              }}
              rows={3}
              placeholder="Provide a reason for this action..."
              className={`w-full px-3 py-2.5 text-sm border rounded-lg resize-none transition-all focus:outline-none focus:ring-2 text-gray-700 placeholder:text-gray-400 ${
                reasonError
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-must-green focus:ring-must-green/10'
              }`}
              autoFocus
            />
            {reasonError && (
              <p className="mt-1 text-xs text-red-600">{reasonError}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            ref={confirmBtnRef}
            onClick={handleConfirm}
            className={
              isDestructive
                ? 'px-5 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors'
                : 'px-5 py-2 rounded-lg text-sm font-semibold text-white bg-must-green hover:bg-must-green-dark transition-colors'
            }
          >
            Yes, proceed
          </button>
        </div>
      </div>
    </div>
  )
}
