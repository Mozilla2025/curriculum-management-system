/**
 * Permission & Role Checking Utilities
 * Pure functions for authorization logic
 * Can be used in both client and server components
 */

import type { UserPermissions } from '@/types/auth'

/**
 * Checks if user has a specific permission
 * @param permissions 
 * @param permission 
 * @returns 
 */
export function hasPermission(
  permissions: UserPermissions | null | undefined,
  permission: keyof UserPermissions
): boolean {
  if (!permissions) return false
  return permissions[permission] === true
}

/**
 * Checks if user has all specified permissions
 * @param permissions - User permissions object from API
 * @param requiredPermissions - Array of required permissions
 * @returns boolean indicating if user has all permissions
 */
export function hasAllPermissions(
  permissions: UserPermissions | null | undefined,
  requiredPermissions: (keyof UserPermissions)[]
): boolean {
  if (!permissions) return false
  return requiredPermissions.every((perm) => permissions[perm] === true)
}

/**
 * Checks if user has any of specified permissions
 * @param permissions 
 * @param requiredPermissions -
 * @returns 
 */
export function hasAnyPermission(
  permissions: UserPermissions | null | undefined,
  requiredPermissions: (keyof UserPermissions)[]
): boolean {
  if (!permissions) return false
  return requiredPermissions.some((perm) => permissions[perm] === true)
}

/**
 * Checks if user is an administrator
 * @param permissions - User permissions object from API
 * @returns boolean indicating if user is admin
 */
export function isAdmin(permissions: UserPermissions | null | undefined): boolean {
  return hasPermission(permissions, 'isAdmin')
}

/**
 * Checks if user is a dean
 * @param permissions - User permissions object from API
 * @returns boolean indicating if user is dean
 */
export function isDean(permissions: UserPermissions | null | undefined): boolean {
  return hasPermission(permissions, 'isDean')
}

/**
 * Checks if user is a vice chancellor
 * @param permissions 
 * @returns 
 */
export function isViceChancellor(
  permissions: UserPermissions | null | undefined
): boolean {
  return hasPermission(permissions, 'isViceChancellor')
}

/**
 * Checks if user can manage curriculum
 * @param permissions 
 * @returns 
 */
export function canManageCurriculum(
  permissions: UserPermissions | null | undefined
): boolean {
  return hasPermission(permissions, 'canManageCurriculum')
}

/**
 * Checks if user can manage users
 * @param permissions 
 * @returns 
 */
export function canManageUsers(
  permissions: UserPermissions | null | undefined
): boolean {
  return hasPermission(permissions, 'canManageUsers')
}

/**
 * Checks if user can view reports
 * @param permissions 
 * @returns 
 */
export function canViewReports(
  permissions: UserPermissions | null | undefined
): boolean {
  return hasPermission(permissions, 'canViewReports')
}
