// src/components/user-dashboard/program-card.tsx

'use client'

import { ArrowRight, GraduationCap, BookOpen, UserGraduate } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Program } from '@/types/user-dashboard'

interface ProgramCardProps {
  program: Program
  schoolName: string
  onClick: () => void
}

const programIcons = {
  masters: GraduationCap,
  phd: UserGraduate,
  degree: BookOpen,
}

const programColors = {
  masters: 'bg-gradient-teal',
  phd: 'bg-gradient-gold',
  degree: 'bg-gradient-green',
}

export function ProgramCard({ program, schoolName, onClick }: ProgramCardProps) {
  const ProgramIcon = programIcons[program.type]

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={0}
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-4',
        'cursor-pointer transition-all duration-300 group',
        'hover:border-must-green hover:shadow-medium hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-must-green focus:ring-offset-2',
        'relative overflow-hidden'
      )}
    >
      {/* Gradient indicator */}
      <div className={cn('absolute top-0 left-0 right-0 h-1', programColors[program.type])} />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-base font-bold text-gray-900">{program.name} Programs</span>
        <span className={cn('px-2 py-1 rounded-full text-xs font-bold text-white shadow-soft', programColors[program.type])}>
          {program.count}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-2 h-2 bg-must-green rounded-full" />
          </div>
          <span>{program.departments.length} department{program.departments.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ProgramIcon className="w-4 h-4 text-must-green" />
          <span className="capitalize">{program.type} Level</span>
        </div>
      </div>

      {/* Action */}
      <div
        className={cn(
          'flex items-center justify-between text-sm font-semibold text-must-green',
          'opacity-0 transform -translate-x-2 transition-all duration-300',
          'group-hover:opacity-100 group-hover:translate-x-0'
        )}
      >
        <span>View Details</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>

      {/* Shine effect */}
      <div
        className={cn(
          'absolute inset-0 -translate-x-full',
          'bg-gradient-to-r from-transparent via-white/30 to-transparent',
          'group-hover:translate-x-full transition-transform duration-700'
        )}
      />
    </div>
  )
}