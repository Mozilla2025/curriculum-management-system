'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingService } from '@/services/tracking.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingPageResponse, TrackingSearchCriteria } from '@/types/tracking'

interface Params {
  criteria: TrackingSearchCriteria
  page?: number
  size?: number
  enabled?: boolean
}

export const useSearchTrackings = ({
  criteria,
  page = 0,
  size = 20,
  enabled = true,
}: Params) =>
  useQuery<TrackingPageResponse>({
    queryKey: queryKeys.tracking.list({ ...criteria, page, size }),
    queryFn: () => trackingService.searchTrackings(criteria, page, size),
    enabled,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
