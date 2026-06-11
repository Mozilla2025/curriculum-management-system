'use client'

import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { queryKeys } from '@/utils/queryKeys'
import type { UserResponse } from '@/types/user-management'

export const useGetAllUsers = () =>
  useQuery<UserResponse[]>({
    queryKey: queryKeys.users.list(),
    queryFn: userService.getAllUsers,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  })
