'use client'

import { useQuery } from '@tanstack/react-query'
import { departmentService } from '@/services/department.service'
import { queryKeys } from '@/utils/queryKeys'
import type { DepartmentPageResponse } from '@/types/department'

interface Params {
  page?: number
  size?: number
  search?: string
}

export const useGetAllDepartments = ({ page = 0, size = 20, search }: Params = {}) =>
  useQuery<DepartmentPageResponse>({
    queryKey: queryKeys.departments.list({ page, size, search }),
    queryFn: () => departmentService.getAllDepartments(page, size, search),
    staleTime: 1000 * 60 * 10,
    retry: 2,
  })
