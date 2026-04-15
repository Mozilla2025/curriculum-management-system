'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'
import type { ChangePasswordFormData } from '@/types/auth'

interface UseChangePasswordReturn {
  isLoading: boolean
  error: string | null
  success: boolean
  changePassword: (data: ChangePasswordFormData) => Promise<void>
  clearError: () => void
  clearSuccess: () => void
}

/**
 * useChangePassword Hook
 * Handles password change for authenticated users
 * Requires current password verification
 */
export function useChangePassword(): UseChangePasswordReturn {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const changePassword = useCallback(
    async (data: ChangePasswordFormData) => {
      setIsLoading(true)
      setError(null)
      setSuccess(false)

      try {
        await authService.changePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        })

        setSuccess(true)

        addToast({
          type: 'success',
          title: 'Password Changed',
          message: 'Your password has been successfully updated.',
        })
      } catch (err: any) {
        const errorMessage =
          err?.message || 'Failed to change password. Please try again.'

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

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearSuccess = useCallback(() => {
    setSuccess(false)
  }, [])

  return {
    isLoading,
    error,
    success,
    changePassword,
    clearError,
    clearSuccess,
  }
}
