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

export interface AuthUser {
  id: string
  username: string
  email: string
  firstName?: string
  lastName?: string
  roles: string[]
}

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