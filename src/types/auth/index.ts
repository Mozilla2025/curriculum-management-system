// ============================================================================
// Form Data Types
// ============================================================================

export interface LoginFormData {
  username: string
  password: string
  rememberMe: boolean
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// ============================================================================
// User Types
// ============================================================================

export interface AuthUser {
  id: string
  userId: number
  username: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  isDean?: boolean
  isAdmin?: boolean
  isViceChancellor?: boolean
}

// ============================================================================
// API Request/Response Types
// ============================================================================

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginRequest extends LoginCredentials {}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  userId: number
  username: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  isDean?: boolean
  isAdmin?: boolean
  isViceChancellor?: boolean
}

export interface LoginResponse extends AuthResponse {}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse extends AuthResponse {}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordResponse {
  message: string
}

export interface LogoutRequest {}

export interface LogoutResponse {
  message: string
}

export interface VerifyEmailRequest {
  token: string
}

export interface VerifyEmailResponse {
  message: string
}

export interface ResendVerificationRequest {
  email: string
}

export interface ResendVerificationResponse {
  message: string
}

// ============================================================================
// Token Validation & Permissions Types
// ============================================================================

export interface UserPermissions {
  canManageCurriculum: boolean
  canManageUsers: boolean
  isDean: boolean
  isAdmin: boolean
  isViceChancellor: boolean
  canViewReports: boolean
}

export interface ValidateResponse {
  valid: boolean
  permissions: UserPermissions
  roles: string[]
  userId: number
  email: string
  username: string
}

export interface ValidateTokenRequest {
  token: string
}

export interface ValidateTokenResponse {
  message?: string
}

export interface CheckRoleRequest {
  roleName: string
}

export interface CheckRoleResponse {
  hasRole: boolean
}

export interface GetPermissionsResponse {
  permissions: UserPermissions
}

// ============================================================================
// User Profile Types
// ============================================================================

export interface UserProfile {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber?: string | null
  enabled: boolean
  roles: string[]
  createdAt: string
  updatedAt: string
}

// ============================================================================
// Validation & State Types
// ============================================================================

export type PasswordStrength = 'weak' | 'medium' | 'strong'

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  strength: PasswordStrength
  score: number
}

export interface FormValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

// Auth page view states
export type ForgotPasswordView = 'form' | 'email-sent'
export type ResetPasswordView = 'form' | 'success' | 'invalid-token'