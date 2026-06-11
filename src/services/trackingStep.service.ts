import { axiosClient } from '@/lib/api/axiosClient'
import type {
  TrackingStepDto,
  TrackingStepPageResponse,
  TrackingStepSearchCriteria,
  TrackingStage,
  TrackingAction,
} from '@/types/tracking'

const ENDPOINTS = {
  BY_TRACKING: (trackingId: number) => `/tracking/steps/tracking/${trackingId}`,
  BY_ID: (stepId: number) => `/tracking/steps/${stepId}`,
  SEARCH: '/tracking/steps/search',
  BY_TRACKING_STAGE: (trackingId: number, stage: TrackingStage) =>
    `/tracking/steps/tracking/${trackingId}/stage/${stage}`,
  BY_TRACKING_ACTION: (trackingId: number, action: TrackingAction) =>
    `/tracking/steps/tracking/${trackingId}/action/${action}`,
  MILESTONES: (trackingId: number) =>
    `/tracking/steps/tracking/${trackingId}/milestones`,
  TRANSITIONS: (trackingId: number) =>
    `/tracking/steps/tracking/${trackingId}/transitions`,
  RECENT: (trackingId: number) => `/tracking/steps/tracking/${trackingId}/recent`,
  LATEST: (trackingId: number) => `/tracking/steps/tracking/${trackingId}/latest`,
  USER_PERFORMED: (userId: number) => `/tracking/steps/user/${userId}/performed`,
  USER_ASSIGNED: (userId: number) => `/tracking/steps/user/${userId}/assigned`,
} as const

export const getStepsByTracking = async (
  trackingId: number,
  page = 0,
  size = 20
): Promise<TrackingStepPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingStepPageResponse }>(
    ENDPOINTS.BY_TRACKING(trackingId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getStepById = async (stepId: number): Promise<TrackingStepDto> => {
  const response = await axiosClient.get<{ data: TrackingStepDto }>(
    ENDPOINTS.BY_ID(stepId)
  )
  return response.data.data
}

export const searchSteps = async (
  criteria: TrackingStepSearchCriteria,
  page = 0,
  size = 20
): Promise<TrackingStepPageResponse> => {
  const response = await axiosClient.post<{ data: TrackingStepPageResponse }>(
    ENDPOINTS.SEARCH,
    criteria,
    { params: { page, size } }
  )
  return response.data.data
}

export const getMilestones = async (
  trackingId: number
): Promise<TrackingStepDto[]> => {
  const response = await axiosClient.get<{ data: TrackingStepDto[] }>(
    ENDPOINTS.MILESTONES(trackingId)
  )
  return response.data.data
}

export const getTransitions = async (
  trackingId: number
): Promise<TrackingStepDto[]> => {
  const response = await axiosClient.get<{ data: TrackingStepDto[] }>(
    ENDPOINTS.TRANSITIONS(trackingId)
  )
  return response.data.data
}

export const getRecentSteps = async (
  trackingId: number,
  limit = 5
): Promise<TrackingStepDto[]> => {
  const response = await axiosClient.get<{ data: TrackingStepDto[] }>(
    ENDPOINTS.RECENT(trackingId),
    { params: { limit } }
  )
  return response.data.data
}

export const getLatestStep = async (
  trackingId: number
): Promise<TrackingStepDto> => {
  const response = await axiosClient.get<{ data: TrackingStepDto }>(
    ENDPOINTS.LATEST(trackingId)
  )
  return response.data.data
}

export const getStepsPerformedByUser = async (
  userId: number,
  page = 0,
  size = 20
): Promise<TrackingStepPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingStepPageResponse }>(
    ENDPOINTS.USER_PERFORMED(userId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getStepsAssignedToUser = async (
  userId: number,
  page = 0,
  size = 20
): Promise<TrackingStepPageResponse> => {
  const response = await axiosClient.get<{ data: TrackingStepPageResponse }>(
    ENDPOINTS.USER_ASSIGNED(userId),
    { params: { page, size } }
  )
  return response.data.data
}

export const trackingStepService = {
  getStepsByTracking,
  getStepById,
  searchSteps,
  getMilestones,
  getTransitions,
  getRecentSteps,
  getLatestStep,
  getStepsPerformedByUser,
  getStepsAssignedToUser,
}
