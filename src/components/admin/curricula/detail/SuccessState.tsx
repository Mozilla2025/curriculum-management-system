'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

type ActionType = 'approve' | 'sendBack' | 'reject'

interface SuccessStateProps {
  curriculumTitle: string
  actionType: ActionType
  destinationStage: string
}

const ACTION_MESSAGE: Record<ActionType, (title: string, dest: string) => string> = {
  approve: (title, dest) => `"${title}" has been sent to ${dest}.`,
  sendBack: (title, dest) => `"${title}" has been returned to ${dest}.`,
  reject: (title) => `"${title}" has been rejected.`,
}

const ICON_STYLES: Record<ActionType, string> = {
  approve: 'text-must-green',
  sendBack: 'text-amber-500',
  reject: 'text-red-500',
}

export function SuccessState({ curriculumTitle, actionType, destinationStage }: SuccessStateProps) {
  const message = ACTION_MESSAGE[actionType](curriculumTitle, destinationStage)
  const iconStyle = ICON_STYLES[actionType]

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
        <CheckCircle2 className={`w-16 h-16 mx-auto mb-5 ${iconStyle}`} />

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Done!</h1>
        <p className="text-base text-gray-600 leading-relaxed">{message}</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-must-green hover:bg-must-green-dark transition-colors"
          >
            Back to dashboard
          </Link>
          <Link
            href="/admin/admin-all-curricula"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            View all curriculums
          </Link>
        </div>
      </div>
    </div>
  )
}
