'use client'

import { useQuery } from '@tanstack/react-query'
import { schoolService } from '@/services/school.service'
import { queryKeys } from '@/utils/queryKeys'
import type { SchoolDto } from '@/types/school'

export const useGetAllSchools = () =>
  useQuery<SchoolDto[]>({
    queryKey: queryKeys.schools.list(),
    queryFn: schoolService.getAllSchools,
    staleTime: 1000 * 60 * 30, // schools rarely change — 30 min cache
    retry: 2,
  })
