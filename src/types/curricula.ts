export type CurriculumStatus = 'approved' | 'pending' | 'draft' | 'rejected' | 'under_review'

export interface Curriculum {
  id: string
  title: string
  code: string
  status: CurriculumStatus
  schoolId: string | number
  schoolName?: string
  programId: string
  programName?: string
  department: string
  departmentId?: string | number
  durationSemesters?: number
  effectiveDate?: string
  expiryDate?: string
  createdDate?: string
  lastModified?: string
  enrollments?: number
}

export interface School {
  id: string | number
  name: string
  code?: string
  icon?: string
  actualId?: string | number
}

export interface Program {
  id: string
  name: string
  displayName?: string
  icon?: string
}

export interface Department {
  id: string | number
  name: string
  code?: string
  schoolId?: string | number
  schoolName?: string
}

export interface CurriculumStats {
  total: number
  approved: number
  pending: number
  draft: number
  rejected: number
  underReview?: number
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface FilterState {
  searchTerm: string
  statusFilter: string
  selectedSchool: string
  selectedProgram: string
  selectedDepartment: string
  sortBy: string
}

export interface Notification {
  show: boolean
  message: string
  type: 'success' | 'error' | 'warning' | 'info' | ''
}

export interface BreadcrumbItem {
  label: string
  action: (() => void) | null
}

export interface ProgramWithStats extends Program {
  count: number
  departments: number
  statusStats: {
    approved: number
    pending: number
    draft: number
    rejected: number
  }
  enhancedDepartments: EnhancedDepartment[]
}

export interface EnhancedDepartment extends Department {
  curriculumCount: number
  source?: 'backend' | 'curriculum'
}

export interface SchoolWithStats extends School {
  stats: {
    total: number
    departments: number
    programs: number
    statusStats: {
      approved: number
      pending: number
      draft: number
      rejected: number
    }
    matchedCurricula?: Curriculum[]
  }
}