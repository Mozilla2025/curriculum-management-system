// src/components/user-dashboard/schools-list.tsx

'use client'

import { useState } from 'react'
import { Building2, BookOpen, GraduationCap, Users, Search } from 'lucide-react'
import { SchoolItem } from './school-item'
import { ProgramModal } from './program-modal'
import type { School, Program } from '@/types/user-dashboard'

interface SchoolsListProps {
  schools: School[]
  loading?: boolean
}

export function SchoolsList({ schools, loading = false }: SchoolsListProps) {
  const [focusedSchool, setFocusedSchool] = useState<string | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<{
    schoolName: string
    program: Program
  } | null>(null)

  const handleProgramClick = (schoolName: string, program: Program) => {
    setSelectedProgram({ schoolName, program })
  }

  const handleCloseModal = () => {
    setSelectedProgram(null)
  }

  // Loading state
  if (loading) {
    return (
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Empty state
  if (!schools || schools.length === 0) {
    return (
      <section className="bg-white rounded-xl border border-gray-200 p-12 shadow-soft text-center">
        <div className="max-w-md mx-auto">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No schools found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or filters to find curricula
          </p>

          <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-must-gold rounded-full" />
              </div>
              <span className="text-sm text-gray-600">
                Try searching for specific program names like &quot;Engineering&quot; or &quot;Business&quot;
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-must-teal rounded-full" />
              </div>
              <span className="text-sm text-gray-600">
                Use the program filters to narrow down your search
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-must-green rounded-full" />
              </div>
              <span className="text-sm text-gray-600">
                Clear your current search and filters to see all available curricula
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Calculate summary stats
  const totalCurricula = schools.reduce((sum, school) => sum + school.total, 0)
  const totalPrograms = schools.reduce((sum, school) => sum + school.programs.length, 0)
  const totalDepartments = schools.reduce((sum, school) => sum + school.departments, 0)

  return (
    <>
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-soft">
        {/* Header */}
        <div className="p-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-must-green" />
            <h2 className="text-xl font-bold text-gray-900">Academic Schools</h2>
          </div>
          <span className="px-4 py-1.5 bg-must-green text-white rounded-full text-sm font-bold shadow-soft">
            {schools.length} school{schools.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Summary Stats */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-must-green" />
              <span className="text-sm font-semibold text-gray-700">
                {totalCurricula} Total Curricula
              </span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-must-teal" />
              <span className="text-sm font-semibold text-gray-700">
                {totalPrograms} Academic Levels
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-must-gold" />
              <span className="text-sm font-semibold text-gray-700">
                {totalDepartments} Departments
              </span>
            </div>
          </div>
        </div>

        {/* Schools List */}
        <div className="p-6">
          {schools.map((school) => (
            <SchoolItem
              key={school.id}
              school={school}
              onProgramClick={handleProgramClick}
              onFocus={() => setFocusedSchool(school.id)}
              onBlur={() => setFocusedSchool(null)}
              isFocused={focusedSchool === school.id}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Showing {schools.length} schools with {totalCurricula} curricula across {totalPrograms} programs
          </p>
        </div>
      </section>

      {/* Program Modal */}
      {selectedProgram && (
        <ProgramModal
          isOpen={!!selectedProgram}
          onClose={handleCloseModal}
          schoolName={selectedProgram.schoolName}
          program={selectedProgram.program}
        />
      )}
    </>
  )
}