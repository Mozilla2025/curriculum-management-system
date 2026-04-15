'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'
import type { ResetPasswordFormData } from '@/types/auth'

interface UseResetPasswordReturn {
  isLoading: boolean
  error: string | null
  success: boolean
  resetPassword: (token: string, data: ResetPasswordFormData) => Promise<void>
  clearError: () => void
}

/**
 * useResetPassword Hook
 * Handles password reset form submission
 * Requires reset token from email link
 * Automatically redirects to login on success
 */
export function useResetPassword(): UseResetPasswordReturn {
  const router = useRouter()
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const resetPassword = useCallback(
    async (token: string, data: ResetPasswordFormData) => {
      setIsLoading(true)
      setError(null)
      setSuccess(false)

      try {
        await authService.resetPassword({
          token,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        })

        setSuccess(true)

        addToast({
          type: 'success',
          title: 'Password Reset',
          message: 'Your password has been successfully reset. Please log in.',
        })

        // Redirect to login after a short delay
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (err: any) {
        const errorMessage =
          err?.message || 'Failed to reset password. Please try again.'

        setError(errorMessage)

        addToast({
          type: 'error',
          title: 'Reset Failed',
          message: errorMessage,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [router, addToast]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    success,
    resetPassword,
    clearError,
  }
}
