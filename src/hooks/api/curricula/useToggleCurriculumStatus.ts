'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'

export const useToggleCurriculumStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => curriculumService.toggleCurriculumStatus(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.curricula.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.curricula.detail(id) })
    },
  })
}
