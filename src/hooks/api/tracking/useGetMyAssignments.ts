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

export const useGetMyAssignments = ({
  page = 0,
  size = 20,
  enabled = true,
}: Params = {}) =>
  useQuery<TrackingPageResponse>({
    queryKey: queryKeys.tracking.myAssignments(page),
    queryFn: () => trackingService.getMyAssignments(page, size),
    enabled,
    staleTime: 1000 * 60 * 1,
    retry: 2,
  })
