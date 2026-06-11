'use client'

import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { queryKeys } from '@/utils/queryKeys'
import type { UserResponse } from '@/types/user-management'

export const useGetUserById = (id: number) =>
  useQuery<UserResponse>({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
