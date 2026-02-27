'use client'

import React, { useState } from 'react'
import type { Curriculum, SchoolWithStats, ProgramWithStats, BreadcrumbItem } from '@/types/curricula'
import { SchoolCard } from './SchoolCard'
import { ProgramsGrid } from './ProgramsGrid'
import { ProgramDetailsView } from './ProgramDetailsView'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'
import { InteractionHint } from './InteractionHint'
import { EmptyState } from '../shared/EmptyState'

type SchoolsNavState =
  | { view: 'schools' }
  | { view: 'programs'; schoolId: string | number; schoolName: string }
  | { view: 'details'; schoolId: string | number; schoolName: string; programId: string; programName: string }

interface SchoolsViewProps {
  schoolsData: SchoolWithStats[]
  allCurricula: Curriculum[]
  isLoading: boolean
  onEdit: (c: Curriculum) => void
  onDelete: (c: Curriculum) => void
  onApprove: (c: Curriculum) => void
  onReject: (c: Curriculum) => void
}

export function SchoolsView({
  schoolsData,
  allCurricula,
  isLoading,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}: SchoolsViewProps) {
  const [nav, setNav] = useState<SchoolsNavState>({ view: 'schools' })
  const [showHint, setShowHint] = useState(true)

  const handleSchoolClick = (schoolId: string | number) => {
    const school = schoolsData.find((s) => s.id === schoolId || String(s.id) === String(schoolId))
    if (!school) return
    setNav({ view: 'programs', schoolId: school.id, schoolName: school.name })
    setShowHint(false)
  }

  const handleProgramClick = (schoolId: string | number, programId: string) => {
    if (nav.view !== 'programs') return
    const school = schoolsData.find((s) => String(s.id) === String(schoolId))
    const programs = getPrograms(schoolId)
    const program = programs.find((p) => String(p.id) === String(programId))
    if (!program) return
    setNav({
      view: 'details',
      schoolId,
      schoolName: nav.schoolName,
      programId,
      programName: program.name,
    })
  }

  const getPrograms = (schoolId: string | number): ProgramWithStats[] => {
    const school = schoolsData.find((s) => String(s.id) === String(schoolId))
    return (school && 'programs' in school && Array.isArray(school.programs)) ? school.programs : []
  }

  const getProgramCurricula = (programId: string): Curriculum[] => {
    return allCurricula.filter((c) => String(c.programId) === String(programId))
  }

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (nav.view === 'schools') return []
    if (nav.view === 'programs') {
      return [
        { label: 'All Schools', action: () => setNav({ view: 'schools' }) },
        { label: nav.schoolName, action: null },
      ]
    }
    return [
      { label: 'All Schools', action: () => setNav({ view: 'schools' }) },
      {
        label: nav.schoolName,
        action: () => {
          if (nav.view === 'details') {
            setNav({ view: 'programs', schoolId: nav.schoolId, schoolName: nav.schoolName })
          }
        },
      },
      { label: nav.programName, action: null },
    ]
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <div>
      <InteractionHint show={showHint && nav.view === 'schools'} onDismiss={() => setShowHint(false)} />

      {breadcrumbs.length > 0 && <BreadcrumbNavigation path={breadcrumbs} />}

      {nav.view === 'schools' && (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-5 bg-gray-100 rounded-full w-20" />
                    <div className="h-5 bg-gray-100 rounded-full w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : schoolsData.length === 0 ? (
            <EmptyState
              icon="fa-university"
              title="No school data available"
              description="Schools with curricula will appear here"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schoolsData.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  onClick={handleSchoolClick}
                />
              ))}
            </div>
          )}
        </>
      )}

      {nav.view === 'programs' && (
        <ProgramsGrid
          programs={getPrograms(nav.schoolId)}
          schoolId={nav.schoolId}
          schoolName={nav.schoolName}
          onProgramClick={handleProgramClick}
          onBack={() => setNav({ view: 'schools' })}
        />
      )}

      {nav.view === 'details' && (
        <ProgramDetailsView
          program={
            getPrograms(nav.schoolId).find((p) => String(p.id) === String(nav.programId)) ?? null
          }
          schoolName={nav.schoolName}
          curricula={getProgramCurricula(nav.programId)}
          isLoading={isLoading}
          onBack={() => {
            if (nav.view === 'details') {
              setNav({ view: 'programs', schoolId: nav.schoolId, schoolName: nav.schoolName })
            }
          }}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </div>
  )
}