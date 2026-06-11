'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { queryKeys } from '@/utils/queryKeys'
import type { AssignRoleRequest } from '@/types/user-management'

export const useAssignRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AssignRoleRequest) => userService.assignRole(data),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}
