'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingStepService } from '@/services/trackingStep.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingStepPageResponse } from '@/types/tracking'

interface Params {
  trackingId: number
  page?: number
  size?: number
}

export const useGetTrackingSteps = ({ trackingId, page = 0, size = 20 }: Params) =>
  useQuery<TrackingStepPageResponse>({
    queryKey: queryKeys.trackingSteps.byTracking(trackingId, { page, size }),
    queryFn: () => trackingStepService.getStepsByTracking(trackingId, page, size),
    enabled: !!trackingId,
    staleTime: 1000 * 60 * 1,
    retry: 2,
  })
