'use client'

import { useQuery } from '@tanstack/react-query'
import { schoolService } from '@/services/school.service'
import { queryKeys } from '@/utils/queryKeys'
import type { SchoolDto } from '@/types/school'

export const useGetSchoolById = (id: number) =>
  useQuery<SchoolDto>({
    queryKey: queryKeys.schools.detail(id),
    queryFn: () => schoolService.getSchoolById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
    retry: 2,
  })
