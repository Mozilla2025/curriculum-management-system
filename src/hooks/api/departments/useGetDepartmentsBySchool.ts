'use client'

import { useQuery } from '@tanstack/react-query'
import { departmentService } from '@/services/department.service'
import { queryKeys } from '@/utils/queryKeys'
import type { DepartmentDto } from '@/types/department'

export const useGetDepartmentsBySchool = (schoolId: number) =>
  useQuery<DepartmentDto[]>({
    queryKey: queryKeys.departments.bySchool(schoolId),
    queryFn: () => departmentService.getDepartmentsBySchool(schoolId),
    enabled: !!schoolId,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  })
