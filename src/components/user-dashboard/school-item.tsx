// src/components/user-dashboard/school-item.tsx

'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui'
import { ProgramCard } from './program-card'
import type { School, Program } from '@/types/user-dashboard'

interface SchoolItemProps {
  school: School
  onProgramClick: (schoolName: string, program: Program) => void
  onFocus?: () => void
  onBlur?: () => void
  isFocused?: boolean
}

const gradients = [
  'bg-gradient-green',
  'bg-gradient-gold',
  'bg-gradient-teal',
  'bg-gradient-to-br from-purple-500 to-purple-700',
]

export function SchoolItem({
  school,
  onProgramClick,
  onFocus,
  onBlur,
  isFocused = false,
}: SchoolItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const gradientClass = gradients[0] // You can implement logic to cycle through gradients

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 overflow-hidden',
        'transition-all duration-300 shadow-soft',
        'hover:shadow-strong hover:border-must-green hover:-translate-y-0.5',
        isFocused && 'border-must-green shadow-strong scale-[1.02]',
        'mb-4 last:mb-0'
      )}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
    >
      {/* Header */}
      <button
        onClick={handleToggle}
        className={cn(
          'w-full p-6 flex items-center justify-between',
          'bg-white hover:bg-gray-50 transition-colors duration-200',
          'border-b border-gray-200'
        )}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Icon */}
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-soft', gradientClass)}>
            <Icon name={school.icon} size={24} />
          </div>

          {/* School Info */}
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900">School of {school.name}</h3>
            <div className="text-sm text-gray-600 font-medium">
              {school.departments} departments • {school.total} curricula
            </div>
          </div>
        </div>

        {/* Stats & Toggle */}
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-must-green text-white rounded-full text-sm font-bold shadow-soft">
            {school.total}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 transition-transform" />
          )}
        </div>
      </button>

      {/* Expanded Programs */}
      {isExpanded && (
        <div className="p-6 bg-gray-50 border-t border-gray-200 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {school.programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                schoolName={school.name}
                onClick={() => onProgramClick(school.name, program)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}