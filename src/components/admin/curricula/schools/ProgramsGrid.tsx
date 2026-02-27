'use client'

import React from 'react'
import type { ProgramWithStats } from '@/types/curricula'
import { ProgramCard } from './ProgramCard'
import { EmptyState } from '../shared/EmptyState'

interface ProgramsGridProps {
  programs: ProgramWithStats[]
  schoolId: string | number
  schoolName: string
  onProgramClick: (schoolId: string | number, programId: string) => void
  onBack: () => void
}

export function ProgramsGrid({ programs, schoolId, schoolName, onProgramClick, onBack }: ProgramsGridProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-[#00BF63] hover:text-[#00BF63] hover:-translate-y-px hover:shadow-sm transition-all"
        >
          <i className="fas fa-arrow-left" />
          <span>Back to Schools</span>
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{schoolName}</h2>
          <p className="text-sm text-gray-500">{programs.length} academic program{programs.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {programs.length === 0 ? (
        <EmptyState
          icon="fa-graduation-cap"
          title="No programs found"
          description="This school has no programs with curricula yet"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              schoolId={schoolId}
              onProgramClick={onProgramClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}