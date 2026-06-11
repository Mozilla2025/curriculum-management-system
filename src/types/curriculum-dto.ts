import type { PaginationMeta } from './api'

// Backend enum values — uppercase as returned by Spring Boot
export type BackendCurriculumStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW'

// Backend DTO — matches CurriculumDto.java exactly
export interface CurriculumDto {
  id: number
  name: string
  code: string
  durationSemesters: number | null
  status: BackendCurriculumStatus
  createdBy: number | null
  approvedBy: number | null
  approvedAt: string | null
  effectiveDate: string | null
  expiryDate: string | null
  active: boolean
  createdAt: string
  updatedAt: string
  schoolId: number
  schoolName: string
  departmentId: number
  departmentName: string
  academicLevelName: string | null
}

export interface CurriculumPageResponse extends PaginationMeta {
  curriculums: CurriculumDto[]
}

// Stats from GET /admin/curriculums/stats
export interface CurriculumStatusStats {
  total: number
  pending: number
  approved: number
  rejected: number
  underReview: number
}

export interface CurriculumSearchCriteria {
  name?: string
  code?: string
  status?: BackendCurriculumStatus
  schoolId?: number
  departmentId?: number
  academicLevelId?: number
  isActive?: boolean
}

export interface CreateCurriculumRequest {
  name: string
  code: string
  durationSemesters?: number
  schoolId: number
  departmentId: number
  academicLevelId?: number
  effectiveDate?: string
  expiryDate?: string
}

export interface UpdateCurriculumRequest extends Partial<CreateCurriculumRequest> {}
