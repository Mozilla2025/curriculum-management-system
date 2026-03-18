export type TrackingStageKey =
  | 'department_submission'
  | 'school_board_review'
  | 'dean_committee'
  | 'senate_review'
  | 'quality_assurance'
  | 'cue_submission'
  | 'cue_review'
  | 'final_approval'

export type TrackingViewMode =
  | 'all'
  | 'workflow'
  | 'table'
  | 'my-initiated'
  | 'my-assigned'
  | 'by-school'
  | 'by-department'
  | 'by-assignee'
  | 'by-initiator'

export interface TrackingDocument {
  id: string | number
  originalFilename: string
  contentType?: string
  fileSize?: number
  formattedFileSize?: string
  fileUrl?: string
  documentType?: string
  documentTypeDisplayName?: string
  description?: string
  uploadedByName?: string
  uploadedAt?: string
  uploadedAtFormatted?: string
  versionNumber?: number
}

export interface TrackingStageData {
  status?: string
  assignedTo?: string
  startedDate?: string
  completedDate?: string
  notes?: string
  feedback?: string
  documents?: TrackingDocument[]
}

export interface CurriculumTracking {
  id: string | number
  trackingId: string
  title: string
  displayTitle?: string
  displayCode?: string
  proposedCurriculumName?: string
  proposedCurriculumCode?: string
  proposedDurationSemesters?: number
  curriculumDescription?: string
  curriculumId?: number
  school: string
  schoolName?: string
  schoolId?: number
  department: string
  departmentName?: string
  departmentId?: number
  academicLevel?: string
  currentStage: TrackingStageKey
  currentStageDisplayName?: string
  originalCurrentStage?: string
  status: string
  statusDisplayName?: string
  originalStatus?: string
  priority?: 'high' | 'medium' | 'low'
  isActive?: boolean
  isCompleted?: boolean
  daysInCurrentStage?: number
  totalDays?: number
  initiatedByName?: string
  initiatedByEmail?: string
  currentAssigneeName?: string
  currentAssigneeEmail?: string
  submittedDate?: string
  lastUpdated?: string
  expectedCompletionDate?: string
  actualCompletionDate?: string
  proposedEffectiveDate?: string
  proposedExpiryDate?: string
  createdAt?: string
  updatedAt?: string
  initialNotes?: string
  stages: Partial<Record<TrackingStageKey, TrackingStageData>>
  selectedStage?: string
  _dataSource?: string
  _transformedAt?: string
  _rawApiData?: unknown
}

export interface TrackingStageConfig {
  key: TrackingStageKey
  title: string
  icon: string
  description: string
  order: number
}

export interface TrackingFiltersState {
  search: string
  school: string
  department: string
  stage: string
  status: string
  schoolId: string
  departmentId: string
  assigneeId: string
  initiatorId: string
}

export interface TrackingModalState {
  stageDetails: boolean
  documentUpload: boolean
  documentViewer: boolean
  notes: boolean
  initiateCurriculum: boolean
  editTracking: boolean
  assignTracking: boolean
  statusManagement: boolean
}

export interface TrackingNotification {
  show: boolean
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

export interface TrackingPaginationState {
  currentPage: number
  pageSize: number
  totalElements: number
  totalPages: number
}

export interface TrackingStatsData {
  total?: number
  inProgress?: number
  onHold?: number
  completed?: number
  overdue?: number
  myInitiated?: number
  myAssigned?: number
  byStatus?: Record<string, number>
  byStage?: Record<string, number>
  byPriority?: Record<string, number>
}

export interface ReturnStageOption {
  key: string
  value: string
  label: string
}
