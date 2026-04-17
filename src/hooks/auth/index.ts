/**
 * Authentication Hooks
 * 
 * This module exports all authentication-related hooks for managing
 * user login, logout, password reset, token validation, permissions,
 * roles, and user data.
 */

// Authentication & Session Management
export { useLogin, type LoginError } from './useLogin'
export { useLogout } from './useLogout'
export { useForgotPassword } from './useForgotPassword'
export { useResetPassword } from './useResetPassword'
export { useValidateToken } from './useValidateToken'
export { useChangePassword } from './useChangePassword'

// User & Authorization Checks
export { useCheckPermissions } from './useCheckPermissions'
export { useCheckRole } from './useCheckRole'
export { useFetchUser } from './useFetchUser'
