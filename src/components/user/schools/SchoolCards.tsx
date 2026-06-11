'use client'

import Link from 'next/link'
import { BookOpen, ArrowRight, Layers, GraduationCap } from 'lucide-react'
import type { SchoolDto } from '@/types/school'
import { useGetCurriculaBySchool } from '@/hooks/api/curricula'
import { useGetDepartmentPageBySchool } from '@/hooks/api/departments'

// Green-family shades only — cycling through the brand palette
const AVATAR_SHADES = [
  'bg-must-green',
  'bg-must-teal',
  'bg-must-green-dark',
  'bg-must-teal-dark',
  'bg-must-green-darker',
]

interface SchoolCardsProps {
  schools: SchoolDto[]
}

interface SchoolCardProps {
  school: SchoolDto
  index: number
}

function SchoolCard({ school, index }: SchoolCardProps) {
  const avatarBg = AVATAR_SHADES[index % AVATAR_SHADES.length]

  const { data: curriculaPage } = useGetCurriculaBySchool({
    schoolId: school.id,
    page: 0,
    size: 1,
  })
  const { data: deptPage } = useGetDepartmentPageBySchool({
    schoolId: school.id,
    page: 0,
    size: 1,
  })

  const curriculaCount = curriculaPage?.totalElements ?? null
  const deptCount = deptPage?.totalElements ?? null

  return (
    <Link
      key={school.id}
      href={`/user/curricula?schoolId=${school.id}`}
      className="group bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-md hover:border-must-green/50 transition-all duration-200"
    >
      {/* Avatar */}
      <div
        className={`w-11 h-11 rounded-lg ${avatarBg} flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-white text-xs font-bold tracking-wider">
          {school.code ?? school.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* School name */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-must-green transition-colors line-clamp-2">
          {school.name}
        </h3>
      </div>

      {/* Counts */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-must-green" />
          {curriculaCount === null ? (
            <span className="inline-block w-6 h-2.5 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span className="font-medium text-gray-700">{curriculaCount}</span>
          )}
          <span>curricula</span>
        </span>
        <span className="text-gray-300">·</span>
        <span className="flex items-center gap-1">
          <GraduationCap className="w-3 h-3 text-must-teal" />
          {deptCount === null ? (
            <span className="inline-block w-6 h-2.5 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span className="font-medium text-gray-700">{deptCount}</span>
          )}
          <span>depts</span>
        </span>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 group-hover:text-must-green transition-colors pt-1 border-t border-gray-100">
        <Layers className="w-3.5 h-3.5" />
        Browse Curricula
        <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  )
}

export function SchoolCards({ schools }: SchoolCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {schools.map((school, index) => (
        <SchoolCard key={school.id} school={school} index={index} />
      ))}
    </div>
  )
}

export function SchoolCardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse space-y-3">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 bg-gray-200 rounded-lg" />
            <div className="w-10 h-5 bg-gray-200 rounded-full" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-28 pt-1 border-t border-gray-100" />
        </div>
      ))}
    </div>
  )
}
