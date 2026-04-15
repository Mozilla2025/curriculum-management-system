'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'
import type { UserProfile } from '@/types/auth'

interface UseFetchUserReturn {
  isLoading: boolean
  error: string | null
  user: UserProfile | null
  fetchUser: (userId: number) => Promise<void>
  clearUser: () => void
}

/**
 * useFetchUser Hook
 * Fetches user profile by ID
 * Caches user data and provides loading/error states
 */
export function useFetchUser(): UseFetchUserReturn {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)

  const fetchUser = useCallback(
    async (userId: number) => {
      setIsLoading(true)
      setError(null)

      try {
        const userData = await authService.getUserById(userId)
        setUser(userData)
      } catch (err: any) {
        const errorMessage =
          err?.message || 'Failed to fetch user'
        setError(errorMessage)

        addToast({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addToast]
  )

  const clearUser = useCallback(() => {
    setUser(null)
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    user,
    fetchUser,
    clearUser,
  }
}
