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

// ============================================================================
// Backend DTO Types — match the Spring Boot DTOs exactly
// These are used by services and TanStack Query hooks.
// Existing frontend types above remain for backward compatibility.
// ============================================================================

export type TrackingStage =
  | 'IDEATION'
  | 'REVIEW_APPROVAL'
  | 'SCHOOL_BOARD'
  | 'DEAN_COMMITTEE'
  | 'SENATE'
  | 'QA_INTERNAL_AUDIT'
  | 'CUE_EXTERNAL_AUDIT'
  | 'VICE_CHANCELLOR_APPROVAL'
  | 'ACCREDITED'

export type TrackingStatus =
  | 'INITIATED'
  | 'IN_PROGRESS'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED_FOR_REVISION'
  | 'COMPLETED'

export type TrackingAction =
  | 'INITIATE'
  | 'APPROVE'
  | 'REJECT'
  | 'RETURN'
  | 'SUBMIT'
  | 'REVIEW'
  | 'COMPLETE'

export type DocumentType =
  | 'CURRICULUM_PROPOSAL'
  | 'SUPPORTING_DOCUMENTS'
  | 'REVISION_DOCUMENTS'
  | 'APPROVAL_CERTIFICATE'
  | 'AUDIT_REPORT'
  | 'OTHER'

export interface TrackingDocumentDto {
  id: number
  documentName: string
  originalFilename: string
  documentType: DocumentType
  documentTypeDisplayName: string
  filePath: string
  fileSize: number
  formattedFileSize: string
  contentType: string
  fileExtension: string
  description: string | null
  uploadedByName: string
  versionNumber: number
  uploadedAt: string
  isActive: boolean
}

export interface TrackingStepDto {
  id: number
  stage: TrackingStage
  stageDisplayName: string
  action: TrackingAction
  actionDisplayName: string
  performedByName: string
  performedByEmail: string
  assignedToName: string | null
  assignedToEmail: string | null
  fromStage: TrackingStage | null
  toStage: TrackingStage | null
  notes: string | null
  performedAt: string
  dueDate: string | null
  isMilestone: boolean
  isStageTransition: boolean
  isForwardMovement: boolean
  isBackwardMovement: boolean
  documents: TrackingDocumentDto[]
}

export interface TrackingOverviewDto {
  id: number
  trackingId: string
  curriculumId: number | null
  curriculumName: string | null
  curriculumCode: string | null
  displayCurriculumName: string
  displayCurriculumCode: string
  proposedCurriculumName: string
  proposedCurriculumCode: string
  schoolId: number
  schoolName: string
  departmentId: number
  departmentName: string
  academicLevelId: number | null
  academicLevelName: string | null
  currentStage: TrackingStage
  currentStageDisplayName: string
  status: TrackingStatus
  statusDisplayName: string
  initiatedByName: string
  currentAssigneeName: string | null
  createdAt: string
  expectedCompletionDate: string | null
  isActive: boolean
  isIdeationStage: boolean
}

export interface TrackingDetailDto extends TrackingOverviewDto {
  proposedDurationSemesters: number | null
  curriculumDescription: string | null
  proposedEffectiveDate: string | null
  proposedExpiryDate: string | null
  initiatedByEmail: string
  currentAssigneeEmail: string | null
  initialNotes: string | null
  updatedAt: string
  actualCompletionDate: string | null
  isCompleted: boolean
  recentSteps: TrackingStepDto[]
}

export interface TrackingPageResponse {
  trackings: TrackingOverviewDto[]
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface TrackingStepPageResponse {
  steps: TrackingStepDto[]
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface TrackingSearchCriteria {
  status?: TrackingStatus
  currentStage?: TrackingStage
  initiatedByUserId?: number
  currentAssigneeId?: number
  schoolId?: number
  departmentId?: number
  academicLevelId?: number
  curriculumId?: number
  searchTerm?: string
  createdAfter?: string
  createdBefore?: string
  expectedCompletionBefore?: string
  isActive?: boolean
  isOverdue?: boolean
  isIdeationStage?: boolean
  hasLinkedCurriculum?: boolean
}

export interface TrackingStepSearchCriteria {
  trackingId?: number
  stage?: TrackingStage
  action?: TrackingAction
  performedByUserId?: number
  assignedToUserId?: number
  performedAfter?: string
  performedBefore?: string
  isMilestone?: boolean
  isStageTransition?: boolean
}

export interface InitiateTrackingRequest {
  curriculumId?: number
  proposedCurriculumName: string
  proposedCurriculumCode: string
  proposedDurationSemesters?: number
  curriculumDescription?: string
  schoolId: number
  departmentId: number
  academicLevelId?: number
  initialNotes?: string
  expectedCompletionDate?: string
  proposedEffectiveDate?: string
  proposedExpiryDate?: string
}

export interface TrackingActionRequest {
  trackingId: number
  action: TrackingAction
  notes?: string
  assigneeId?: number
  dueDate?: string
  isMilestone?: boolean
}

export interface TrackingPermissionResponse {
  hasPermission: boolean
  canApprove: boolean
  canReject: boolean
  canReturn: boolean
}

export interface TrackingTransitionValidation {
  isValid: boolean
  currentStage: TrackingStage
  targetStage: TrackingStage
}
