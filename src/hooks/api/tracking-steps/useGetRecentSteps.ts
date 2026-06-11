'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingStepService } from '@/services/trackingStep.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingStepDto } from '@/types/tracking'

export const useGetRecentSteps = (trackingId: number, limit = 5) =>
  useQuery<TrackingStepDto[]>({
    queryKey: queryKeys.trackingSteps.recent(trackingId, limit),
    queryFn: () => trackingStepService.getRecentSteps(trackingId, limit),
    enabled: !!trackingId,
    staleTime: 1000 * 60 * 1,
    retry: 2,
  })
