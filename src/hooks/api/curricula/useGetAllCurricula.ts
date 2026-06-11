'use client'

import { useQuery } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { CurriculumPageResponse } from '@/types/curriculum-dto'

interface Params {
  page?: number
  size?: number
}

export const useGetAllCurricula = ({ page = 0, size = 20 }: Params = {}) =>
  useQuery<CurriculumPageResponse>({
    queryKey: queryKeys.curricula.list({ page, size }),
    queryFn: () => curriculumService.getAllCurricula(page, size),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
