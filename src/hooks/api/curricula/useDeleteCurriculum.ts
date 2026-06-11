'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'

export const useDeleteCurriculum = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, permanent = false }: { id: number; permanent?: boolean }) =>
      permanent
        ? curriculumService.permanentDeleteCurriculum(id)
        : curriculumService.deleteCurriculum(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.curricula.all })
    },
  })
}
