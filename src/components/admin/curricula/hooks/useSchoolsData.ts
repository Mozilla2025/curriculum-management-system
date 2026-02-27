import { useMemo } from 'react'
import type { Curriculum, School, Program, SchoolWithStats, ProgramWithStats, EnhancedDepartment } from '@/types/curricula'

export function useSchoolsData(
  curricula: Curriculum[],
  schools: School[],
  programs: Program[]
): SchoolWithStats[] {
  return useMemo(() => {
    if (!curricula.length || !schools.length) return []

    const programMap = new Map(programs.map((p) => [String(p.id), p]))

    const schoolsWithStats: SchoolWithStats[] = schools.map((school) => {
      const schoolCurricula = curricula.filter(
        (c) => String(c.schoolId) === String(school.id)
      )

      const schoolPrograms = schoolCurricula.reduce((acc, c) => {
        if (!acc.find((p) => p.id === c.programId)) {
          const prog = programs.find((p) => p.id === c.programId)
          if (prog) acc.push(prog)
        }
        return acc
      }, [] as Program[])

      const programsWithStats: ProgramWithStats[] = schoolPrograms.map((program) => {
        const programCurricula = schoolCurricula.filter(
          (c) => String(c.programId) === String(program.id)
        )

        const departmentMap = new Map<string, EnhancedDepartment>()
        programCurricula.forEach((c) => {
          const deptKey = c.department || 'Unknown'
          if (!departmentMap.has(deptKey)) {
            departmentMap.set(deptKey, {
              id: deptKey,
              name: deptKey,
              curriculumCount: 0,
              source: 'curriculum',
            })
          }
          const dept = departmentMap.get(deptKey)!
          dept.curriculumCount++
        })

        const statusStats = {
          approved: programCurricula.filter((c) => c.status === 'approved').length,
          pending: programCurricula.filter((c) => c.status === 'pending').length,
          draft: programCurricula.filter((c) => c.status === 'draft').length,
          rejected: programCurricula.filter((c) => c.status === 'rejected').length,
        }

        return {
          ...program,
          count: programCurricula.length,
          departments: departmentMap.size,
          statusStats,
          enhancedDepartments: Array.from(departmentMap.values()),
        } as ProgramWithStats
      }).filter((p) => p.count > 0)

      return {
        ...school,
        stats: {
          total: schoolCurricula.length,
          departments: 0,
          programs: programsWithStats.length,
          statusStats: {
            approved: schoolCurricula.filter((c) => c.status === 'approved').length,
            pending: schoolCurricula.filter((c) => c.status === 'pending').length,
            draft: schoolCurricula.filter((c) => c.status === 'draft').length,
            rejected: schoolCurricula.filter((c) => c.status === 'rejected').length,
          },
          matchedCurricula: schoolCurricula,
        },
        programs: programsWithStats,
      } as SchoolWithStats
    }).filter((s) => s.stats.total > 0)

    return schoolsWithStats
  }, [curricula, schools, programs])
}