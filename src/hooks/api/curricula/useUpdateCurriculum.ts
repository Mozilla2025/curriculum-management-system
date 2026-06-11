'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { UpdateCurriculumRequest } from '@/types/curriculum-dto'

export const useUpdateCurriculum = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCurriculumRequest }) =>
      curriculumService.updateCurriculum(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.curricula.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.curricula.detail(id) })
    },
  })
}
