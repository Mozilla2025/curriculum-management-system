/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls:
 * - Login/Logout
 * - Token Refresh
 * - Password Reset Flow
 
 */

import { axiosClient } from '@/lib/api/axiosClient'
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  LogoutResponse,
  ValidateResponse,
  ValidateTokenRequest,
  CheckRoleResponse,
  GetPermissionsResponse,
  UserProfile,
} from '@/types/auth'

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/password/forgot',
  VALIDATE_TOKEN: '/auth/password/validate-token',
  RESET_PASSWORD: '/auth/password/reset',
  VALIDATE: '/auth/validate',
  CHECK_ROLE: '/auth/check-role',
  PERMISSIONS: '/auth/permissions',
} as const

const USER_ENDPOINTS = {
  GET_USER_BY_ID: (id: number) => `/users/user/${id}`,
} as const

/**
 * Login Service
 * 
 * Authenticates user with username and password
 * Returns access token, refresh token, and user data
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axiosClient.post<{ data: LoginResponse }>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed'
    throw new Error(message)
  }
}

/**
 * Logout Service
 * 
 * Clears session on backend and invalidates tokens
 */
export async function logout(): Promise<LogoutResponse> {
  try {
    const response = await axiosClient.post<{ data: LogoutResponse }>(
      AUTH_ENDPOINTS.LOGOUT
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Logout failed'
    throw new Error(message)
  }
}

/**
 * Refresh Token Service
 * 
 * Obtains new access token using refresh token
 * Called automatically by global interceptor on 401 errors
 */
export async function refreshToken(
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> {
  try {
    const response = await axiosClient.post<{ data: RefreshTokenResponse }>(
      AUTH_ENDPOINTS.REFRESH,
      request
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Token refresh failed'
    throw new Error(message)
  }
}

/**
 * Forgot Password Service
 * 
 * Initiates password reset flow by sending reset link to email
 */
export async function forgotPassword(
  request: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  try {
    const response = await axiosClient.post<{ data: ForgotPasswordResponse }>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      request
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to send reset email'
    throw new Error(message)
  }
}

/**
 * Reset Password Service
 * 
 * Completes password reset using token from email link
 */
export async function resetPassword(
  request: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  try {
    const response = await axiosClient.post<{ data: ResetPasswordResponse }>(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      request
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to reset password'
    throw new Error(message)
  }
}

/**
 * Change Password Service
 * 
 * Changes password for authenticated user
 * Requires current password verification
 */
export async function changePassword(
  request: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  try {
    const response = await axiosClient.post<{ data: ChangePasswordResponse }>(
      '/auth/change-password',
      request
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to change password'
    throw new Error(message)
  }
}

/**
 * Validate Password Reset Token Service
 * 
 * Validates if a password reset token is still valid
 * Called before showing password reset form
 * Returns 204 No Content on success
 */
export async function validatePasswordToken(token: string): Promise<void> {
  try {
    await axiosClient.post(`${AUTH_ENDPOINTS.VALIDATE_TOKEN}?token=${token}`)
  } catch (error: any) {
    const message = error.response?.data?.message || 'Invalid or expired token'
    throw new Error(message)
  }
}

/**
 * Validate Token & Get Permissions Service
 * 
 * Validates current access token and returns user permissions
 * Called on app initialization to sync authentication state
 */
export async function validateToken(): Promise<ValidateResponse> {
  try {
    const response = await axiosClient.get<{ data: ValidateResponse }>(
      AUTH_ENDPOINTS.VALIDATE
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Token validation failed'
    throw new Error(message)
  }
}

/**
 * Check User Role Service
 * 
 * Checks if current user has a specific role
 * Used for runtime role verification
 */
export async function checkRole(roleName: string): Promise<CheckRoleResponse> {
  try {
    const response = await axiosClient.post<{ data: CheckRoleResponse }>(
      `${AUTH_ENDPOINTS.CHECK_ROLE}?roleName=${roleName}`
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to check role'
    throw new Error(message)
  }
}

/**
 * Get User Permissions Service
 * 
 * Fetches all permissions for current user
 * Returns granular permissions for feature-level access control
 */
export async function getPermissions(): Promise<GetPermissionsResponse> {
  try {
    const response = await axiosClient.get<{ data: GetPermissionsResponse }>(
      AUTH_ENDPOINTS.PERMISSIONS
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch permissions'
    throw new Error(message)
  }
}

/**
 * Get User by ID Service
 * 
 * Fetches specific user profile details
 * Used to get full user information on demand
 */
export async function getUserById(userId: number): Promise<UserProfile> {
  try {
    const response = await axiosClient.get<{ data: UserProfile }>(
      USER_ENDPOINTS.GET_USER_BY_ID(userId)
    )
    return response.data.data
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch user'
    throw new Error(message)
  }
}

/**
 * Service Export
 * 
 * All auth service methods available as single export
 */
export const authService = {
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  validatePasswordToken,
  validateToken,
  checkRole,
  getPermissions,
  getUserById,
}
