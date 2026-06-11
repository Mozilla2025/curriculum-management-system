'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { departmentService } from '@/services/department.service'
import { queryKeys } from '@/utils/queryKeys'

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => departmentService.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all })
    },
  })
}
