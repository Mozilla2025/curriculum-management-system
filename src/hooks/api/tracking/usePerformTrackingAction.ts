'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { trackingService } from '@/services/tracking.service'
import { queryKeys } from '@/utils/queryKeys'
import type { TrackingActionRequest } from '@/types/tracking'

export const usePerformTrackingAction = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      data,
      documents,
    }: {
      data: TrackingActionRequest
      documents?: File[]
    }) => trackingService.performTrackingAction(data, documents),
    onSuccess: (_result, { data }) => {
      // Invalidate the specific tracking detail and the full list
      queryClient.invalidateQueries({
        queryKey: queryKeys.tracking.detail(data.trackingId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.tracking.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.trackingSteps.all })
    },
  })
}
