'use client'

import { useQuery } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { CurriculumPageResponse } from '@/types/curriculum-dto'

interface Params {
  schoolId: number
  page?: number
  size?: number
}

export const useGetCurriculaBySchool = ({ schoolId, page = 0, size = 20 }: Params) =>
  useQuery<CurriculumPageResponse>({
    queryKey: queryKeys.curricula.bySchool(schoolId, page),
    queryFn: () => curriculumService.getCurriculaBySchool(schoolId, page, size),
    enabled: !!schoolId,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
