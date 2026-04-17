'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { authService } from '@/services/auth.service'
import type { UserPermissions } from '@/types/auth'

interface UseCheckPermissionsReturn {
  isLoading: boolean
  error: string | null
  permissions: UserPermissions | null
  fetchPermissions: () => Promise<void>
  hasPermission: (permission: keyof UserPermissions) => boolean
}

/**
 * useCheckPermissions Hook
 * Fetches and caches user permissions
 * Provides helpers to check specific permissions
 */
export function useCheckPermissions(): UseCheckPermissionsReturn {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<UserPermissions | null>(null)

  const fetchPermissions = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.getPermissions()
      setPermissions(response.permissions)
    } catch (err: any) {
      const errorMessage =
        err?.message || 'Failed to fetch permissions'
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

  const hasPermission = useCallback(
    (permission: keyof UserPermissions): boolean => {
      if (!permissions) return false
      return permissions[permission] === true
    },
    [permissions]
  )

  return {
    isLoading,
    error,
    permissions,
    fetchPermissions,
    hasPermission,
  }
}
