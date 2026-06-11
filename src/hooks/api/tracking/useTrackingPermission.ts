'use client'

import { useQuery } from '@tanstack/react-query'
import { trackingService } from '@/services/tracking.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingPermissionResponse } from '@/types/tracking'

export const useTrackingPermission = (trackingId: number) =>
  useQuery<TrackingPermissionResponse>({
    queryKey: queryKeys.tracking.permission(trackingId),
    queryFn: () => trackingService.hasTrackingPermission(trackingId),
    enabled: !!trackingId,
    staleTime: 0, // always fresh — permissions can change between actions
    retry: 1,
  })
