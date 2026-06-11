'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingService } from '@/services/tracking.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingDetailDto } from '@/types/tracking'

export const useGetTrackingById = (id: number) =>
  useQuery<TrackingDetailDto>({
    queryKey: queryKeys.tracking.detail(id),
    queryFn: () => trackingService.getTrackingById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 1,
    retry: 2,
  })
