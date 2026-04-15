'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import {
  setAuthToken,
  setUserRole,
  setUserData,
  clearAuthToken,
} from '@/lib/auth'
import type { LoginFormData, AuthResponse, AuthUser } from '@/types/auth'

export interface LoginError {
  message: string
  type: 'credentials' | 'network' | 'server' | 'validation' | 'general'
  code?: string
}

interface UseLoginReturn {
  isLoading: boolean
  error: LoginError | null
  login: (credentials: LoginFormData) => Promise<void>
  clearError: () => void
}

/**
 * useLogin Hook
 * Handles login form submission and token storage
 * Implements automatic redirect on successful login
 * Provides loading and error states for UI
 */
export function useLogin(): UseLoginReturn {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<LoginError | null>(null)

  const login = useCallback(
    async (credentials: LoginFormData) => {
      setIsLoading(true)
      setError(null)

      try {
        // Call login API
        const response: AuthResponse = await authService.login({
          username: credentials.username,
          password: credentials.password,
        })

        // Store tokens in localStorage
        localStorage.setItem('auth_token', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('accessToken', response.accessToken)

        // Update auth library functions
        setAuthToken(response.accessToken)

        // Determine user role from response
        // Priority: isAdmin flag > isDean flag > ADMIN in roles array > first role > user
        let userRole: string
        
        if (response.isAdmin === true) {
          userRole = 'admin'
        } else if (response.isDean === true) {
          userRole = 'dean'
        } else if (response.roles && Array.isArray(response.roles)) {
          // Check if ADMIN is in the roles array
          const hasAdminRole = response.roles.some(
            (role) => role.toUpperCase() === 'ADMIN'
          )
          if (hasAdminRole) {
            userRole = 'admin'
          } else {
            // Use the first role
            userRole = response.roles[0]?.toLowerCase() || 'user'
          }
        } else {
          userRole = 'user'
        }

        setUserRole(userRole as any)

        // Store user data with role
        setUserData({
          id: String(response.userId),
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          role: userRole as any,
        })

        // Redirect based on role
        if (userRole === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/user/dashboard')
        }
      } catch (err: any) {
        const errorMessage = err?.message || 'Login failed. Please check your credentials.'
        
        // Determine error type
        let errorType: LoginError['type'] = 'general'
        
        if (
          errorMessage.includes('network') ||
          errorMessage.includes('fetch') ||
          errorMessage.includes('Failed to fetch') ||
          errorMessage.includes('Unable to connect')
        ) {
          errorType = 'network'
        } else if (
          errorMessage.includes('server') ||
          errorMessage.includes('500') ||
          errorMessage.includes('timeout')
        ) {
          errorType = 'server'
        } else if (
          errorMessage.includes('credentials') ||
          errorMessage.includes('Unauthorized') ||
          errorMessage.includes('invalid') ||
          errorMessage.includes('401')
        ) {
          errorType = 'credentials'
        }

        setError({
          message: errorMessage,
          type: errorType,
        })

        // Clear any partial auth data
        clearAuthToken()
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    login,
    clearError,
  }
}
