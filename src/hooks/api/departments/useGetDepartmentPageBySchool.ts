'use client'

import { useQuery } from '@tanstack/react-query'
import { departmentService } from '@/services/department.service'
import { queryKeys } from '@/utils/queryKeys'
import type { DepartmentPageResponse } from '@/types/department'

interface Params {
  schoolId: number
  page?: number
  size?: number
}

export const useGetDepartmentPageBySchool = ({ schoolId, page = 0, size = 20 }: Params) =>
  useQuery<DepartmentPageResponse>({
    queryKey: [...queryKeys.departments.bySchool(schoolId), page],
    queryFn: () => departmentService.getDepartmentPageBySchool(schoolId, page, size),
    enabled: !!schoolId,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  })
