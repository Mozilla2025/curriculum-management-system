'use client'

import { Calendar, BookOpen, Building2, Users, Hash } from 'lucide-react'
import { StatusBadge } from '../shared/StatusBadge'
import type { Curriculum } from '@/types/curricula'

interface ProgrammeInfoCardProps {
  curriculum: Curriculum
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm text-gray-800 font-semibold mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export function ProgrammeInfoCard({ curriculum }: ProgrammeInfoCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-snug">{curriculum.title}</h2>
          <p className="text-xs text-gray-400 font-mono mt-1">{curriculum.code}</p>
        </div>
        <StatusBadge status={curriculum.status} />
      </div>

      <div>
        <InfoRow
          icon={<Building2 className="w-4 h-4 text-gray-500" />}
          label="School"
          value={curriculum.schoolName ?? 'Unknown School'}
        />
        <InfoRow
          icon={<BookOpen className="w-4 h-4 text-gray-500" />}
          label="Department"
          value={curriculum.department ?? 'Unknown Department'}
        />
        {curriculum.programName && (
          <InfoRow
            icon={<Hash className="w-4 h-4 text-gray-500" />}
            label="Programme"
            value={curriculum.programName}
          />
        )}
        {curriculum.enrollments !== undefined && (
          <InfoRow
            icon={<Users className="w-4 h-4 text-gray-500" />}
            label="Enrollments"
            value={`${curriculum.enrollments} students`}
          />
        )}
        {curriculum.effectiveDate && (
          <InfoRow
            icon={<Calendar className="w-4 h-4 text-gray-500" />}
            label="Effective Date"
            value={new Date(curriculum.effectiveDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
        )}
        {curriculum.lastModified && (
          <InfoRow
            icon={<Calendar className="w-4 h-4 text-gray-500" />}
            label="Last Updated"
            value={new Date(curriculum.lastModified).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
        )}
      </div>
    </div>
  )
}
