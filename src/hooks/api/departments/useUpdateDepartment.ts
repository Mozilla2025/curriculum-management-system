'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { departmentService } from '@/services/department.service'
import { queryKeys } from '@/utils/queryKeys'
import type { UpdateDepartmentRequest } from '@/types/department'

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDepartmentRequest }) =>
      departmentService.updateDepartment(id, data),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.detail(id) })
    },
  })
}
