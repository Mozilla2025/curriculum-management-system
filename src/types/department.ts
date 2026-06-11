import type { PaginationMeta } from './api'

// Backend DTO — matches DepartmentDto.java exactly
export interface DepartmentDto {
  id: number
  name: string
  code: string
  headId: number | null
  schoolId: number
  schoolName: string
  curriculumCount: number
  createdAt: string
  updatedAt: string
}

export interface DepartmentPageResponse extends PaginationMeta {
  departments: DepartmentDto[]
}

export interface CreateDepartmentRequest {
  name: string
  code: string
  schoolId: number
  headId?: number
}

export interface UpdateDepartmentRequest {
  name?: string
  code?: string
  headId?: number
}
