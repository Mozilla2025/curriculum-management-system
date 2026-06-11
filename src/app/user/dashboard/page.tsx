'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { DashboardCards } from '@/components/user-dashboard/dashboard-cards'
import { SchoolCards, SchoolCardsSkeleton } from '@/components/user/schools/SchoolCards'
import { useGetAllSchools } from '@/hooks/api/schools'
import { useGetAllCurricula } from '@/hooks/api/curricula'
import type { DashboardStats } from '@/types/user-dashboard'

function DashboardContent() {
  // ── Data fetching ──────────────────────────────────────────────────────
  // /stats/summary requires auth — derive counts from public endpoints.
  const { data: schools, isPending: schoolsPending } = useGetAllSchools()
  const { data: allCurricula, isPending: curriculaPending } = useGetAllCurricula({
    page: 0,
    size: 1, // only need totalElements, not the actual items
  })

  const isStatsLoading =
    (schoolsPending && !schools) || (curriculaPending && !allCurricula)

  const stats: DashboardStats = {
    totalCurricula:   allCurricula?.totalElements ?? 0,
    totalSchools:     schools?.length ?? 0,
    totalPrograms:    24,
    totalDepartments: 0,
  }

  const isSchoolsLoading = schoolsPending && !schools

  return (
    <div className="space-y-8">

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Curriculum Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Overview of academic curricula across all schools
          </p>
        </div>
        <Link
          href="/user/curricula"
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-must-green border-2 border-must-green/30 rounded-lg hover:bg-must-green hover:text-white hover:border-must-green transition-all"
        >
          <BookOpen className="w-4 h-4" />
          View All Curricula
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ── Stats cards ───────────────────────────────────────────────── */}
      <DashboardCards stats={stats} loading={isStatsLoading} />

      {/* ── Schools section ───────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Academic Schools</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Select a school to browse its curricula
            </p>
          </div>
          {!isSchoolsLoading && schools && schools.length > 0 && (
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {schools.length} schools
            </span>
          )}
        </div>

        {isSchoolsLoading ? (
          <SchoolCardsSkeleton count={8} />
        ) : (
          <SchoolCards schools={schools ?? []} />
        )}
      </div>

    </div>
  )
}

export default function UserDashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  )
}
