'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingService } from '@/services/tracking.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingPageResponse } from '@/types/tracking'

interface Params {
  page?: number
  size?: number
  enabled?: boolean
}

export const useGetMyTrackings = ({ page = 0, size = 20, enabled = true }: Params = {}) =>
  useQuery<TrackingPageResponse>({
    queryKey: queryKeys.tracking.myTrackings(page),
    queryFn: () => trackingService.getMyTrackings(page, size),
    enabled,
    staleTime: 1000 * 60 * 1,
    retry: 2,
  })
