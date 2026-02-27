'use client'

import React from 'react'
import type { Curriculum, ProgramWithStats } from '@/types/curricula'
import { StatusBadge } from '../shared/StatusBadge'
import { CurriculumActions } from './CurriculumActions'
import { EmptyState } from '../shared/EmptyState'

interface ProgramDetailsViewProps {
  program: ProgramWithStats | null
  schoolName: string
  curricula: Curriculum[]
  isLoading: boolean
  onBack: () => void
  onEdit: (c: Curriculum) => void
  onDelete: (c: Curriculum) => void
  onApprove: (c: Curriculum) => void
  onReject: (c: Curriculum) => void
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-CA')
  } catch {
    return 'N/A'
  }
}

export function ProgramDetailsView({
  program,
  schoolName,
  curricula,
  isLoading,
  onBack,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}: ProgramDetailsViewProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-[#00BF63] hover:text-[#00BF63] hover:-translate-y-px hover:shadow-sm transition-all"
        >
          <i className="fas fa-arrow-left" />
          <span>Back to Programs</span>
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{program?.name ?? 'Program'}</h2>
          <p className="text-sm text-gray-500">
            {schoolName} • {curricula.length} curriculum record{curricula.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#00BF63] rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading curricula...</p>
        </div>
      ) : curricula.length === 0 ? (
        <EmptyState
          icon="fa-book-open"
          title="No curricula found"
          description="This program has no curricula records"
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 min-w-[250px]">
                    Curriculum Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 min-w-[180px]">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 min-w-[120px]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 min-w-[130px]">
                    Last Updated
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800 min-w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {curricula.map((curriculum) => (
                  <tr key={curriculum.id} className="border-b border-gray-100 hover:bg-[#00BF63]/5 transition-colors">
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-gray-900">{curriculum.title}</span>
                        {curriculum.code && (
                          <span className="text-xs text-gray-400 font-mono">{curriculum.code}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium align-top">
                      {curriculum.department || 'N/A'}
                    </td>
                    <td className="px-6 py-4 align-top pt-4">
                      <StatusBadge status={curriculum.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 align-top">
                      {formatDate(curriculum.lastModified)}
                    </td>
                    <td className="px-6 py-4 text-center align-top pt-4">
                      <CurriculumActions
                        curriculum={curriculum}
                        isLoading={isLoading}
                        onApprove={onApprove}
                        onReject={onReject}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}