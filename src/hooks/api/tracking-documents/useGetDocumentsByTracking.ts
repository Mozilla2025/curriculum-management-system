'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingDocumentService } from '@/services/trackingDocument.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingDocumentDto } from '@/types/tracking'

export const useGetDocumentsByTracking = (trackingId: number) =>
  useQuery<TrackingDocumentDto[]>({
    queryKey: queryKeys.trackingDocuments.byTracking(trackingId),
    queryFn: () => trackingDocumentService.getDocumentsByTracking(trackingId),
    enabled: !!trackingId,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
