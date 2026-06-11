'use client'

import { useQuery } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { CurriculumDto } from '@/types/curriculum-dto'

export const useGetCurriculumById = (id: number) =>
  useQuery<CurriculumDto>({
    queryKey: queryKeys.curricula.detail(id),
    queryFn: () => curriculumService.getCurriculumById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
