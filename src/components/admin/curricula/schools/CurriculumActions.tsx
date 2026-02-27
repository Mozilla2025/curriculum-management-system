'use client'

import React from 'react'
import type { Curriculum } from '@/types/curricula'

interface CurriculumActionsProps {
  curriculum: Curriculum
  isLoading: boolean
  onApprove: (c: Curriculum) => void
  onReject: (c: Curriculum) => void
  onEdit: (c: Curriculum) => void
  onDelete: (c: Curriculum) => void
}

export function CurriculumActions({ curriculum, isLoading, onApprove, onReject, onEdit, onDelete }: CurriculumActionsProps) {
  if (curriculum.status === 'pending') {
    return (
      <div className="flex justify-center items-center gap-2">
        <button onClick={() => onApprove(curriculum)} disabled={isLoading} title="Approve"
          className="flex items-center justify-center w-8 h-8 rounded-md border border-[#00BF63] text-[#00BF63] text-xs hover:bg-[#00BF63] hover:text-white hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          <i className="fas fa-check" />
        </button>
        <button onClick={() => onReject(curriculum)} disabled={isLoading} title="Reject"
          className="flex items-center justify-center w-8 h-8 rounded-md border border-[#f0b41c] text-[#f0b41c] text-xs hover:bg-[#f0b41c] hover:text-white hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          <i className="fas fa-times" />
        </button>
        <button onClick={() => onEdit(curriculum)} disabled={isLoading} title="Edit"
          className="flex items-center justify-center px-3 h-8 rounded-md bg-[#00BF63] text-white text-xs hover:bg-[#00a855] hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          <i className="fas fa-edit" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button onClick={() => onEdit(curriculum)} disabled={isLoading} title="Edit"
        className="flex items-center justify-center px-3 h-8 rounded-md bg-[#00BF63] text-white text-xs hover:bg-[#00a855] hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
        <i className="fas fa-edit" />
      </button>
      <button onClick={() => onDelete(curriculum)} disabled={isLoading} title="Delete"
        className="flex items-center justify-center w-8 h-8 rounded-md border border-red-500 text-red-500 text-xs hover:bg-red-500 hover:text-white hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
        <i className="fas fa-trash" />
      </button>
    </div>
  )
}