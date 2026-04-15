'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'
import type { ForgotPasswordFormData } from '@/types/auth'

interface UseForgotPasswordReturn {
  isLoading: boolean
  error: string | null
  success: boolean
  submitEmail: (data: ForgotPasswordFormData) => Promise<void>
  clearError: () => void
  reset: () => void
}

/**
 * useForgotPassword Hook
 * Handles forgot password form submission
 * Manages loading, error, and success states
 */
export function useForgotPassword(): UseForgotPasswordReturn {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitEmail = useCallback(async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await authService.forgotPassword({
        email: data.email,
      })

      setSuccess(true)

      addToast({
        type: 'success',
        title: 'Email Sent',
        message: 'Password reset instructions have been sent to your email.',
      })
    } catch (err: any) {
      const errorMessage =
        err?.message || 'Failed to send reset email. Please try again.'

      setError(errorMessage)

      addToast({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }, [addToast])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    success,
    submitEmail,
    clearError,
    reset,
  }
}
