'use client'

import React from 'react'
import type { Curriculum } from '@/types/curricula'
import { CurriculumTableRow } from './CurriculumTableRow'
import { Pagination } from './Pagination'
import { EmptyState } from '../shared/EmptyState'

interface CurriculumTableProps {
  curricula: Curriculum[]
  isLoading: boolean
  currentPage: number
  pageSize: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  onPageChange: (page: number) => void
  onPreviousPage: () => void
  onNextPage: () => void
  onPageSizeChange: (size: number) => void
  onEdit: (curriculum: Curriculum) => void
  onDelete: (curriculum: Curriculum) => void
  onApprove: (curriculum: Curriculum) => void
  onReject: (curriculum: Curriculum) => void
  getSchoolName: (schoolId: string | number) => string
  getProgramName: (programId: string) => string
  onRefresh: () => void
}

export function CurriculumTable({
  curricula,
  isLoading,
  currentPage,
  pageSize,
  totalElements,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  onPreviousPage,
  onNextPage,
  onPageSizeChange,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  getSchoolName,
  getProgramName,
  onRefresh,
}: CurriculumTableProps) {
  const enriched = curricula.map((c) => ({
    ...c,
    schoolName: c.schoolName || getSchoolName(c.schoolId ?? ''),
    programName: c.programName || getProgramName(c.programId ?? ''),
    title: c.title || 'Untitled Curriculum',
    department: c.department || 'Unknown Department',
    status: c.status || 'draft',
  }))

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-16 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#00BF63] rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading curricula...</p>
        </div>
      </div>
    )
  }

  if (enriched.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <EmptyState
          title="No curricula found"
          description="Try adjusting your search criteria or filters"
          action={{ label: 'Refresh Data', onClick: onRefresh }}
          className="border-0 rounded-none"
        />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap w-[35%] min-w-[300px]">
                Curriculum Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap w-[20%] min-w-[200px]">
                School
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap w-[15%] min-w-[150px]">
                Department
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap w-[10%] min-w-[120px]">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 whitespace-nowrap w-[12%] min-w-[140px]">
                Last Updated
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800 whitespace-nowrap w-[8%] min-w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {enriched.map((curriculum) => (
              <CurriculumTableRow
                key={curriculum.id}
                curriculum={curriculum}
                isLoading={isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalElements={totalElements}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        onPageChange={onPageChange}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onPageSizeChange={onPageSizeChange}
        isLoading={isLoading}
      />
    </div>
  )
}