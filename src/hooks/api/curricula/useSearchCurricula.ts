'use client'

import { useQuery } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { CurriculumPageResponse, CurriculumSearchCriteria } from '@/types/curriculum-dto'

interface Params {
  criteria: CurriculumSearchCriteria
  page?: number
  size?: number
  enabled?: boolean
}

export const useSearchCurricula = ({ criteria, page = 0, size = 20, enabled = true }: Params) =>
  useQuery<CurriculumPageResponse>({
    queryKey: queryKeys.curricula.list({ ...criteria, page, size }),
    queryFn: () => curriculumService.searchCurricula(criteria, page, size),
    enabled,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
