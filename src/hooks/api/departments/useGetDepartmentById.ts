'use client'

import { useQuery } from '@tanstack/react-query'
import { departmentService } from '@/services/department.service'
import { queryKeys } from '@/utils/queryKeys'
import type { DepartmentDto } from '@/types/department'

export const useGetDepartmentById = (id: number) =>
  useQuery<DepartmentDto>({
    queryKey: queryKeys.departments.detail(id),
    queryFn: () => departmentService.getDepartmentById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  })
