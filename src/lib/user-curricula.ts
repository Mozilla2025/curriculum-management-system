import { mockDashboardData } from '@/lib/mock-data'

export interface FlatCurriculum {
  id: string
  title: string
  status: string
  lastUpdated: string
  school: string
  program: string
  department: string
}

export function getFlatCurricula(): FlatCurriculum[] {
  const result: FlatCurriculum[] = []
  mockDashboardData.schools.forEach((school) => {
    school.programs.forEach((program) => {
      program.departments.forEach((department) => {
        department.curricula.forEach((curriculum) => {
          result.push({
            id:          curriculum.id,
            title:       curriculum.title,
            status:      curriculum.status,
            lastUpdated: curriculum.lastUpdated,
            school:      school.name,
            program:     program.name,
            department:  department.name,
          })
        })
      })
    })
  })
  return result
}

export function getCurriculumById(id: string): FlatCurriculum | undefined {
  return getFlatCurricula().find((c) => c.id === id)
}
