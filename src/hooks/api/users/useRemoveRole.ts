'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { queryKeys } from '@/utils/queryKeys'

export const useRemoveRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, roleName }: { userId: number; roleName: string }) =>
      userService.removeRole(userId, roleName),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}
