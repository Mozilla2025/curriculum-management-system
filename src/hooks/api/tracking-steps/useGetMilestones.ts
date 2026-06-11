'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingStepService } from '@/services/trackingStep.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingStepDto } from '@/types/tracking'

export const useGetMilestones = (trackingId: number) =>
  useQuery<TrackingStepDto[]>({
    queryKey: queryKeys.trackingSteps.milestones(trackingId),
    queryFn: () => trackingStepService.getMilestones(trackingId),
    enabled: !!trackingId,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
