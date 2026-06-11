'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { trackingDocumentService } from '@/services/trackingDocument.service'
import { queryKeys } from '@/utils/queryKeys'
import type { DocumentType } from '@/types/tracking'

interface UploadParams {
  file: File
  stepId: number
  trackingId: number
  documentType: DocumentType
  description?: string
  onProgress?: (percent: number) => void
}

export const useUploadDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ file, stepId, documentType, description, onProgress }: UploadParams) =>
      trackingDocumentService.uploadDocument(
        file,
        stepId,
        documentType,
        description,
        onProgress
      ),
    onSuccess: (_data, { trackingId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.trackingDocuments.byTracking(trackingId),
      })
    },
  })
}
