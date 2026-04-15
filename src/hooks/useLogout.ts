'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'
import { clearAuthToken } from '@/lib/auth'

interface UseLogoutReturn {
  isLoading: boolean
  error: string | null
  logout: () => Promise<void>
}

/**
 * useLogout Hook
 * Handles user logout
 * Clears tokens from localStorage
 * Redirects to login page
 */
export function useLogout(): UseLogoutReturn {
  const router = useRouter()
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logout = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Call logout endpoint to invalidate tokens on backend
      try {
        await authService.logout()
      } catch (err) {
        // Even if backend logout fails, proceed with client-side logout
        console.error('Backend logout failed:', err)
      }

      // Clear all auth data from localStorage
      clearAuthToken()
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')

      addToast({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been successfully logged out.',
      })

      // Redirect to login
      router.push('/login')
    } catch (err: any) {
      const errorMessage = err?.message || 'Logout failed'
      setError(errorMessage)

      addToast({
        type: 'error',
        title: 'Logout Error',
        message: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }, [router, addToast])

  return {
    isLoading,
    error,
    logout,
  }
}
