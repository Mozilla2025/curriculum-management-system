'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'

interface UseCheckRoleReturn {
  isLoading: boolean
  error: string | null
  checkRole: (roleName: string) => Promise<boolean>
}

/**
 * useCheckRole Hook
 * Checks if current user has a specific role
 * Used for runtime role verification
 */
export function useCheckRole(): UseCheckRoleReturn {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkRole = useCallback(
    async (roleName: string): Promise<boolean> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await authService.checkRole(roleName)
        return response.hasRole
      } catch (err: any) {
        const errorMessage =
          err?.message || 'Failed to check role'
        setError(errorMessage)

        addToast({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        })

        return false
      } finally {
        setIsLoading(false)
      }
    },
    [addToast]
  )

  return {
    isLoading,
    error,
    checkRole,
  }
}
