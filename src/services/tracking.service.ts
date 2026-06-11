import { axiosClient } from '@/lib/api/axiosClient'
import type {
  TrackingDetailDto,
  TrackingPageResponse,
  TrackingSearchCriteria,
  TrackingStage,
  TrackingStatus,
  InitiateTrackingRequest,
  TrackingActionRequest,
  TrackingPermissionResponse,
  TrackingTransitionValidation,
} from '@/types/tracking'

const ENDPOINTS = {
  // Public read
  LIST: '/tracking',
  BY_ID: (id: number) => `/tracking/${id}`,
  BY_TRACKING_ID: (tid: string) => `/tracking/by-tracking-id/${tid}`,
  SEARCH: '/tracking/search',
  BY_STATUS: (status: TrackingStatus) => `/tracking/status/${status}`,
  BY_STAGE: (stage: TrackingStage) => `/tracking/stage/${stage}`,
  BY_SCHOOL: (schoolId: number) => `/tracking/school/${schoolId}`,
  BY_DEPARTMENT: (deptId: number) => `/tracking/department/${deptId}`,
  // Protected read
  MY_TRACKINGS: '/tracking/my-trackings',
  MY_ASSIGNMENTS: '/tracking/my-assignments',
  BY_ASSIGNEE: (userId: number) => `/tracking/assignee/${userId}`,
  BY_INITIATOR: (userId: number) => `/tracking/initiator/${userId}`,
  HAS_PERMISSION: (id: number) => `/tracking/${id}/has-permission`,
  VALIDATE_TRANSITION: (id: number, stage: TrackingStage) =>
    `/tracking/${id}/validate-transition/${stage}`,
  // Mutations
  INITIATE: '/tracking/initiate',
  ACTION: '/tracking/action',
  UPDATE: (id: number) => `/tracking/${id}`,
  DEACTIVATE: (id: number) => `/tracking/${id}/deactivate`,
  REACTIVATE: (id: number) => `/tracking/${id}/reactivate`,
  ASSIGN: (id: number, assigneeId: number) => `/tracking/${id}/assign/${assigneeId}`,
} as const

export const getAllTrackings = async (
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.LIST,
    { params: { page, size } }
  )
  return response.data.data
}

export const getTrackingById = async (id: number): Promise<TrackingDetailDto> => {
  const response = await axiosClient.get<{ data: TrackingDetailDto }>(ENDPOINTS.BY_ID(id))
  return response.data.data
}

export const getTrackingByTrackingId = async (
  trackingId: string
): Promise<TrackingDetailDto> => {
  const response = await axiosClient.get<{ data: TrackingDetailDto }>(
    ENDPOINTS.BY_TRACKING_ID(trackingId)
  )
  return response.data.data
}

export const searchTrackings = async (
  criteria: TrackingSearchCriteria,
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.post<{ data: TrackingPageResponse }>(
    ENDPOINTS.SEARCH,
    criteria,
    { params: { page, size } }
  )
  return response.data.data
}

export const getTrackingsByStatus = async (
  status: TrackingStatus,
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.BY_STATUS(status),
    { params: { page, size } }
  )
  return response.data.data
}

export const getTrackingsByStage = async (
  stage: TrackingStage,
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.BY_STAGE(stage),
    { params: { page, size } }
  )
  return response.data.data
}

export const getTrackingsBySchool = async (
  schoolId: number,
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.BY_SCHOOL(schoolId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getTrackingsByDepartment = async (
  deptId: number,
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.BY_DEPARTMENT(deptId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getMyTrackings = async (
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.MY_TRACKINGS,
    { params: { page, size } }
  )
  return response.data.data
}

export const getMyAssignments = async (
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.MY_ASSIGNMENTS,
    { params: { page, size } }
  )
  return response.data.data
}

export const getTrackingsByAssignee = async (
  userId: number,
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.BY_ASSIGNEE(userId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getTrackingsByInitiator = async (
  userId: number,
  page = 0,
  size = 20
): Promise<TrackingPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingPageResponse }>(
    ENDPOINTS.BY_INITIATOR(userId),
    { params: { page, size } }
  )
  return response.data.data
}

export const hasTrackingPermission = async (
  id: number
): Promise<TrackingPermissionResponse> => {
  const response = await axiosClient.get<{ data: TrackingPermissionResponse }>(
    ENDPOINTS.HAS_PERMISSION(id)
  )
  return response.data.data
}

export const validateTransition = async (
  id: number,
  targetStage: TrackingStage
): Promise<TrackingTransitionValidation> => {
  const response = await axiosClient.post<{ data: TrackingTransitionValidation }>(
    ENDPOINTS.VALIDATE_TRANSITION(id, targetStage)
  )
  return response.data.data
}

export const initiateTracking = async (
  data: InitiateTrackingRequest,
  documents?: File[]
): Promise<TrackingDetailDto> => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })
  documents?.forEach((file) => formData.append('documents', file))

  const response = await axiosClient.post<{ data: TrackingDetailDto }>(
    ENDPOINTS.INITIATE,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data.data
}

export const performTrackingAction = async (
  data: TrackingActionRequest,
  documents?: File[]
): Promise<TrackingDetailDto> => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })
  documents?.forEach((file) => formData.append('documents', file))

  const response = await axiosClient.post<{ data: TrackingDetailDto }>(
    ENDPOINTS.ACTION,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data.data
}

export const deactivateTracking = async (id: number): Promise<void> => {
  await axiosClient.post(ENDPOINTS.DEACTIVATE(id))
}

export const reactivateTracking = async (id: number): Promise<void> => {
  await axiosClient.post(ENDPOINTS.REACTIVATE(id))
}

export const assignTracking = async (
  id: number,
  assigneeId: number
): Promise<void> => {
  await axiosClient.post(ENDPOINTS.ASSIGN(id, assigneeId))
}

export const trackingService = {
  getAllTrackings,
  getTrackingById,
  getTrackingByTrackingId,
  searchTrackings,
  getTrackingsByStatus,
  getTrackingsByStage,
  getTrackingsBySchool,
  getTrackingsByDepartment,
  getMyTrackings,
  getMyAssignments,
  getTrackingsByAssignee,
  getTrackingsByInitiator,
  hasTrackingPermission,
  validateTransition,
  initiateTracking,
  performTrackingAction,
  deactivateTracking,
  reactivateTracking,
  assignTracking,
}
