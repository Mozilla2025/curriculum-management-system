'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingService } from '@/services/tracking.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingPageResponse } from '@/types/tracking'

interface Params {
  page?: number
  size?: number
}

export const useGetAllTrackings = ({ page = 0, size = 20 }: Params = {}) =>
  useQuery<TrackingPageResponse>({
    queryKey: queryKeys.tracking.list({ page, size }),
    queryFn: () => trackingService.getAllTrackings(page, size),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
