'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingStepService } from '@/services/trackingStep.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingStepDto } from '@/types/tracking'

export const useGetLatestStep = (trackingId: number) =>
  useQuery<TrackingStepDto>({
    queryKey: queryKeys.trackingSteps.latest(trackingId),
    queryFn: () => trackingStepService.getLatestStep(trackingId),
    enabled: !!trackingId,
    staleTime: 1000 * 60 * 1,
    retry: 2,
  })
