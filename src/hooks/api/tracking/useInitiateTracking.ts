'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { trackingService } from '@/services/tracking.service'
import { queryKeys } from '@/utils/queryKeys'
import type { InitiateTrackingRequest } from '@/types/tracking'

export const useInitiateTracking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      data,
      documents,
    }: {
      data: InitiateTrackingRequest
      documents?: File[]
    }) => trackingService.initiateTracking(data, documents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tracking.all })
    },
  })
}
