'use client'

import { useQuery } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { CurriculumPageResponse } from '@/types/curriculum-dto'

interface Params {
  departmentId: number
  page?: number
  size?: number
}

export const useGetCurriculaByDepartment = ({
  departmentId,
  page = 0,
  size = 20,
}: Params) =>
  useQuery<CurriculumPageResponse>({
    queryKey: queryKeys.curricula.byDepartment(departmentId, page),
    queryFn: () => curriculumService.getCurriculaByDepartment(departmentId, page, size),
    enabled: !!departmentId,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
