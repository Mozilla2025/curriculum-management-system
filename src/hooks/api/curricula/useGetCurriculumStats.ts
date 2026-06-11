'use client'

import { useQuery } from '@tanstack/react-query'
import { curriculumService } from '@/services/curriculum.service'
import { queryKeys } from '@/utils/queryKeys'
import type { CurriculumStatusStats } from '@/types/curriculum-dto'

export const useGetCurriculumStats = () =>
  useQuery<CurriculumStatusStats>({
    queryKey: queryKeys.curricula.stats(),
    queryFn: curriculumService.getCurriculumStats,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2, // auto-refresh every 2 min for admin dashboard
    retry: 2,
  })
