'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { CreateCurriculumRequest } from '@/types/curriculum-dto'

export const useCreateCurriculum = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCurriculumRequest) =>
      curriculumService.createCurriculum(data),
    onSuccess: () => {
      // Invalidate list AND stats — both must reflect the new record
      queryClient.invalidateQueries({ queryKey: queryKeys.curricula.all })
    },
  })
}
