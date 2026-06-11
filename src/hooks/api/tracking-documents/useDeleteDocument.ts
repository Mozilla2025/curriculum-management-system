'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { trackingDocumentService } from '@/services/trackingDocument.service'
import { queryKeys } from '@/utils/queryKeys'

export const useDeleteDocument = (trackingId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (documentId: number) =>
      trackingDocumentService.deleteDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.trackingDocuments.byTracking(trackingId),
      })
    },
  })
}
