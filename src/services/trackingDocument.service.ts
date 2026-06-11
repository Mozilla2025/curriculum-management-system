import { axiosClient } from '@/lib/api/axiosClient'
import type { TrackingDocumentDto, DocumentType } from '@/types/tracking'

const ENDPOINTS = {
  BY_ID: (id: number) => `/tracking/documents/${id}`,
  DOWNLOAD: (id: number) => `/tracking/documents/download/${id}`,
  DOWNLOAD_URL: (id: number) => `/tracking/documents/download-url/${id}`,
  BY_TRACKING: (trackingId: number) => `/tracking/documents/tracking/${trackingId}`,
  BY_STEP: (stepId: number) => `/tracking/documents/step/${stepId}`,
  BY_TYPE: (trackingId: number, type: DocumentType) =>
    `/tracking/documents/tracking/${trackingId}/type/${type}`,
  SEARCH: '/tracking/documents/search',
  VERSIONS: '/tracking/documents/versions',
  STATISTICS: '/tracking/documents/statistics',
  UPLOAD: '/tracking/documents/upload',
  UPLOAD_BATCH: '/tracking/documents/upload/batch',
  UPDATE: (id: number) => `/tracking/documents/${id}`,
  DELETE: (id: number) => `/tracking/documents/${id}`,
  NEW_VERSION: (id: number) => `/tracking/documents/${id}/version`,
  COPY: (id: number) => `/tracking/documents/${id}/copy`,
  UPLOAD_URL: '/tracking/documents/upload-url',
} as const

export interface DownloadUrlResponse {
  url: string
  expiresAt: string
}

export interface DocumentStatistics {
  totalDocuments: number
  totalStorageBytes: number
  formattedTotalStorage: string
  byType: Record<DocumentType, number>
}

export const getDocumentById = async (id: number): Promise<TrackingDocumentDto> => {
  const response = await axiosClient.get<{ data: TrackingDocumentDto }>(ENDPOINTS.BY_ID(id))
  return response.data.data
}

export const getDownloadUrl = async (
  id: number,
  expiresIn = 3600
): Promise<DownloadUrlResponse> => {
  const response = await axiosClient.get<{ data: DownloadUrlResponse }>(
    ENDPOINTS.DOWNLOAD_URL(id),
    { params: { expiresIn } }
  )
  return response.data.data
}

export const getDocumentsByTracking = async (
  trackingId: number
): Promise<TrackingDocumentDto[]> => {
  const response = await axiosClient.get<{ data: TrackingDocumentDto[] }>(
    ENDPOINTS.BY_TRACKING(trackingId)
  )
  return response.data.data
}

export const getDocumentsByStep = async (
  stepId: number
): Promise<TrackingDocumentDto[]> => {
  const response = await axiosClient.get<{ data: TrackingDocumentDto[] }>(
    ENDPOINTS.BY_STEP(stepId)
  )
  return response.data.data
}

export const getDocumentsByType = async (
  trackingId: number,
  documentType: DocumentType
): Promise<TrackingDocumentDto[]> => {
  const response = await axiosClient.get<{ data: TrackingDocumentDto[] }>(
    ENDPOINTS.BY_TYPE(trackingId, documentType)
  )
  return response.data.data
}

export const getDocumentVersions = async (
  documentId: number
): Promise<TrackingDocumentDto[]> => {
  const response = await axiosClient.get<{ data: TrackingDocumentDto[] }>(
    ENDPOINTS.VERSIONS,
    { params: { documentId } }
  )
  return response.data.data
}

export const getDocumentStatistics = async (): Promise<DocumentStatistics> => {
  const response = await axiosClient.get<{ data: DocumentStatistics }>(
    ENDPOINTS.STATISTICS
  )
  return response.data.data
}

export const uploadDocument = async (
  file: File,
  stepId: number,
  documentType: DocumentType,
  description?: string,
  onProgress?: (percent: number) => void
): Promise<TrackingDocumentDto> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('stepId', String(stepId))
  formData.append('documentType', documentType)
  if (description) formData.append('description', description)

  const response = await axiosClient.post<{ data: TrackingDocumentDto }>(
    ENDPOINTS.UPLOAD,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total))
        }
      },
    }
  )
  return response.data.data
}

export const uploadDocumentBatch = async (
  files: File[],
  stepId: number,
  documentTypes?: DocumentType[],
  descriptions?: string[]
): Promise<TrackingDocumentDto[]> => {
  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))
  formData.append('stepId', String(stepId))
  documentTypes?.forEach((t) => formData.append('documentTypes', t))
  descriptions?.forEach((d) => formData.append('descriptions', d))

  const response = await axiosClient.post<{ data: TrackingDocumentDto[] }>(
    ENDPOINTS.UPLOAD_BATCH,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data.data
}

export const updateDocument = async (
  id: number,
  data: { description?: string; documentType?: DocumentType }
): Promise<TrackingDocumentDto> => {
  const response = await axiosClient.put<{ data: TrackingDocumentDto }>(
    ENDPOINTS.UPDATE(id),
    data
  )
  return response.data.data
}

export const deleteDocument = async (id: number): Promise<void> => {
  await axiosClient.delete(ENDPOINTS.DELETE(id))
}

export const uploadNewVersion = async (
  documentId: number,
  file: File,
  description?: string
): Promise<TrackingDocumentDto> => {
  const formData = new FormData()
  formData.append('file', file)
  if (description) formData.append('description', description)

  const response = await axiosClient.post<{ data: TrackingDocumentDto }>(
    ENDPOINTS.NEW_VERSION(documentId),
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data.data
}

export const copyDocument = async (
  documentId: number,
  targetStepId: number
): Promise<TrackingDocumentDto> => {
  const response = await axiosClient.post<{ data: TrackingDocumentDto }>(
    ENDPOINTS.COPY(documentId),
    { targetStepId }
  )
  return response.data.data
}

export const trackingDocumentService = {
  getDocumentById,
  getDownloadUrl,
  getDocumentsByTracking,
  getDocumentsByStep,
  getDocumentsByType,
  getDocumentVersions,
  getDocumentStatistics,
  uploadDocument,
  uploadDocumentBatch,
  updateDocument,
  deleteDocument,
  uploadNewVersion,
  copyDocument,
}
