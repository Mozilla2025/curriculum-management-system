'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'
import { setUserRole, getUserRole } from '@/lib/auth'
import type { ValidateResponse, UserPermissions } from '@/types/auth'

interface UseValidateTokenReturn {
  isValidating: boolean
  isValid: boolean
  permissions: UserPermissions | null
  userInfo: Omit<ValidateResponse, 'valid' | 'permissions'> | null
  error: string | null
  validateAndSync: () => Promise<void>
}

/**
 * useValidateToken Hook
 * Validates current access token and syncs user permissions
 * Should be called once on app initialization
 * Used to restore session after page refresh
 */
export function useValidateToken(): UseValidateTokenReturn {
  const router = useRouter()
  const { addToast } = useToast()
  const [isValidating, setIsValidating] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [permissions, setPermissions] = useState<UserPermissions | null>(null)
  const [userInfo, setUserInfo] = useState<Omit<ValidateResponse, 'valid' | 'permissions'> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateAndSync = useCallback(async () => {
    setIsValidating(true)
    setError(null)

    try {
      const response = await authService.validateToken()

      if (response.valid) {
        setIsValid(true)
        setPermissions(response.permissions)
        setUserInfo({
          roles: response.roles,
          userId: response.userId,
          email: response.email,
          username: response.username,
        })

        // Update user role if not already set
        const currentRole = getUserRole()
        if (!currentRole && response.roles.length > 0) {
          const roleMap: Record<string, string> = {
            ADMIN: 'admin',
            DEAN: 'dean',
            STAFF: 'staff',
            FACULTY: 'faculty',
            STUDENT: 'student',
          }
          const role = roleMap[response.roles[0]] || response.roles[0].toLowerCase()
          setUserRole(role as any)
        }
      } else {
        setIsValid(false)
        setError('Token is invalid')
        router.push('/login')
      }
    } catch (err: any) {
      setIsValid(false)
      const errorMessage = err?.message || 'Failed to validate token'
      setError(errorMessage)

      // Only redirect if token is invalid (not network errors)
      if (err?.message?.includes('401') || err?.message?.includes('invalid')) {
        router.push('/login')
      }
    } finally {
      setIsValidating(false)
    }
  }, [router, addToast])

  // Validate on mount
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || localStorage.getItem('auth_token') : null
    
    if (token) {
      validateAndSync()
    } else {
      setIsValidating(false)
      setIsValid(false)
    }
  }, [validateAndSync])

  return {
    isValidating,
    isValid,
    permissions,
    userInfo,
    error,
    validateAndSync,
  }
}
