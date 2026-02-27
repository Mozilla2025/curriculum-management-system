'use client'

import React from 'react'
import type { Curriculum } from '@/types/curricula'
import { StatusBadge } from '../shared/StatusBadge'

interface CurriculumTableRowProps {
  curriculum: Curriculum
  isLoading: boolean
  onEdit: (curriculum: Curriculum) => void
  onDelete: (curriculum: Curriculum) => void
  onApprove: (curriculum: Curriculum) => void
  onReject: (curriculum: Curriculum) => void
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-CA')
  } catch {
    return 'Invalid Date'
  }
}

function getTimeSince(dateString: string | undefined): string {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  const diffDays = Math.ceil(Math.abs(Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`
}

export function CurriculumTableRow({
  curriculum,
  isLoading,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}: CurriculumTableRowProps) {
  const renderActions = () => {
    if (curriculum.status === 'pending') {
      return (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => onApprove(curriculum)}
            disabled={isLoading}
            title="Approve"
            className="flex items-center justify-center w-8 h-8 rounded-md border border-[#00BF63] text-[#00BF63] text-xs hover:bg-[#00BF63] hover:text-white hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <i className="fas fa-check" />
          </button>
          <button
            onClick={() => onReject(curriculum)}
            disabled={isLoading}
            title="Reject"
            className="flex items-center justify-center w-8 h-8 rounded-md border border-[#f0b41c] text-[#f0b41c] text-xs hover:bg-[#f0b41c] hover:text-white hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <i className="fas fa-times" />
          </button>
          <button
            onClick={() => onEdit(curriculum)}
            disabled={isLoading}
            title="Edit"
            className="flex items-center justify-center px-3 h-8 rounded-md bg-[#00BF63] text-white text-xs hover:bg-[#00a855] hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <i className="fas fa-edit" />
          </button>
        </div>
      )
    }

    return (
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => onEdit(curriculum)}
          disabled={isLoading}
          title="Edit"
          className="flex items-center justify-center px-3 h-8 rounded-md bg-[#00BF63] text-white text-xs hover:bg-[#00a855] hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <i className="fas fa-edit" />
        </button>
        <button
          onClick={() => onDelete(curriculum)}
          disabled={isLoading}
          title="Delete"
          className="flex items-center justify-center w-8 h-8 rounded-md border border-red-500 text-red-500 text-xs hover:bg-red-500 hover:text-white hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    )
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-[#00BF63]/5 transition-colors">
      <td className="px-6 py-5 align-top">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-900 leading-snug" title={curriculum.title}>
            {curriculum.title}
          </span>
          <span className="text-xs text-gray-400 font-mono">
            {curriculum.code || curriculum.id}
          </span>
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-gray-600 font-medium align-top">
        {curriculum.schoolName || 'Unknown School'}
      </td>
      <td className="px-6 py-5 text-sm text-gray-600 font-medium align-top">
        {curriculum.department || 'Unknown Department'}
      </td>
      <td className="px-6 py-5 align-top pt-4">
        <StatusBadge status={curriculum.status} />
      </td>
      <td className="px-6 py-5 align-top">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-800 font-medium">
            {formatDate(curriculum.lastModified)}
          </span>
          <span className="text-xs text-gray-400">
            {getTimeSince(curriculum.lastModified)}
          </span>
        </div>
      </td>
      <td className="px-6 py-5 text-center align-top pt-4">
        {renderActions()}
      </td>
    </tr>
  )
}