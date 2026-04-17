'use client'

import { useCallback, useState, useEffect } from 'react'
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
  retryLogin: (credentials: LoginFormData) => Promise<void>
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

  // Check existing tokens on mount
  useEffect(() => {
    const existingToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || localStorage.getItem('auth_token') : null
    if (existingToken) {
      console.warn('⚠️  Existing auth token found in localStorage:', existingToken.substring(0, 20) + '...')
    }
  }, [])

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
        console.error('Login error details:', {
          message: err?.message,
          statusCode: err?.statusCode,
          isNetworkError: err?.isNetworkError,
          fullError: err
        })
        
        let errorMessage = err?.message || 'Login failed. Please check your credentials.'
        let errorType: LoginError['type'] = 'general'

        // Check for different error types
        const statusCode = err?.statusCode
        
        if (err?.isNetworkError || err?.message?.includes('Server is unreachable') || err?.message?.includes('server is running') || err?.message?.includes('timeout')) {
          errorType = 'network'
        } else if (statusCode === 400) {
          errorType = 'credentials'
          errorMessage = 'Invalid username or password. Please try again.'
        } else if (statusCode === 401) {
          errorType = 'credentials'
          errorMessage = 'Unauthorized. Please check your credentials.'
        } else if (statusCode >= 500) {
          errorType = 'server'
          errorMessage = 'Server error. Please try again later.'
        } else if (statusCode === 0 || err?.message?.includes('Cannot reach server')) {
          errorType = 'network'
        } else if (err?.message?.includes('validation')) {
          errorType = 'validation'
        }

        console.log('Setting error:', { errorMessage, errorType })

        setError({
          message: errorMessage,
          type: errorType,
          code: err?.code || statusCode,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const retryLogin = useCallback(
    async (credentials: LoginFormData) => {
      // Retry with a fresh attempt
      await login(credentials)
    },
    [login]
  )

  return {
    isLoading,
    error,
    login,
    clearError,
    retryLogin,
  }
}
