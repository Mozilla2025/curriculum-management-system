'use client'

import { cn } from '@/lib/utils'
import { useGetAllSchools } from '@/hooks/api/schools'

interface SchoolFilterProps {
  selectedSchoolId: number | null
  onSelect: (id: number | null) => void
}

export function SchoolFilter({ selectedSchoolId, onSelect }: SchoolFilterProps) {
  const { data: schools, isPending } = useGetAllSchools()

  if (isPending && !schools) {
    return (
      <div className="flex gap-2 flex-wrap animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-28 bg-gray-200 rounded-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-semibold transition-all border-2',
          selectedSchoolId === null
            ? 'bg-must-green text-white border-must-green shadow-sm'
            : 'bg-white text-gray-700 border-gray-200 hover:border-must-green hover:text-must-green',
        )}
      >
        All Schools
      </button>

      {(schools ?? []).map((school) => (
        <button
          key={school.id}
          onClick={() => onSelect(school.id)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-semibold transition-all border-2',
            selectedSchoolId === school.id
              ? 'bg-must-green text-white border-must-green shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-must-green hover:text-must-green',
          )}
        >
          {school.name}
        </button>
      ))}
    </div>
  )
}
