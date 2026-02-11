import type { PasswordValidationResult, FormValidationResult } from '@/types/auth'

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const trimmed = email.trim()
  if (!trimmed || trimmed.length > 254) return false
  return emailRegex.test(trimmed)
}

export function validateUniversityEmail(email: string): boolean {
  if (!validateEmail(email)) return false
  const lower = email.trim().toLowerCase()
  const universityDomains = ['must.ac.ke', 'students.must.ac.ke', 'staff.must.ac.ke']
  return universityDomains.some((domain) => lower.endsWith(`@${domain}`))
}

export function validatePassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false
  return password.length >= 6
}

export function validateStrongPassword(password: string): PasswordValidationResult {
  if (!validatePassword(password)) {
    return { isValid: false, errors: ['Password must be at least 6 characters long'], strength: 'weak', score: 0 }
  }

  const errors: string[] = []
  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++

  const strength = score >= 6 ? 'strong' : score >= 4 ? 'medium' : 'weak'

  if (password.length < 8) errors.push('Consider using at least 8 characters')
  if (!/[A-Z]/.test(password)) errors.push('Consider adding uppercase letters')
  if (!/\d/.test(password)) errors.push('Consider adding numbers')
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) errors.push('Consider adding special characters')

  return { isValid: true, errors, strength, score }
}

export function validatePasswordMatch(password: string, confirmPassword: string): FormValidationResult {
  const errors: Record<string, string> = {}
  if (!confirmPassword?.trim()) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return { isValid: Object.keys(errors).length === 0, errors }
}

export function validateLoginForm(data: { username: string; password: string }): FormValidationResult {
  const errors: Record<string, string> = {}
  if (!data.username?.trim()) errors.username = 'Username is required'
  if (!data.password?.trim()) errors.password = 'Password is required'
  else if (!validatePassword(data.password)) errors.password = 'Password must be at least 6 characters'
  return { isValid: Object.keys(errors).length === 0, errors }
}

export function validatePasswordResetForm(
  newPassword: string,
  confirmPassword: string
): FormValidationResult {
  const errors: Record<string, string> = {}
  if (!newPassword?.trim()) {
    errors.newPassword = 'New password is required'
  } else if (!validatePassword(newPassword)) {
    errors.newPassword = 'Password must be at least 6 characters long'
  }
  const matchResult = validatePasswordMatch(newPassword, confirmPassword)
  if (!matchResult.isValid) {
    errors.confirmPassword = matchResult.errors.confirmPassword
  }
  return { isValid: Object.keys(errors).length === 0, errors }
}

export function getPasswordStrengthLabel(password: string): { text: string; color: string } {
  if (!password) return { text: '', color: 'gray' }
  const { strength } = validateStrongPassword(password)
  switch (strength) {
    case 'strong': return { text: 'Strong password', color: 'green' }
    case 'medium': return { text: 'Good password', color: 'orange' }
    default: return { text: 'Weak password', color: 'red' }
  }
}

export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''
  return input.trim().replace(/[<>]/g, '').substring(0, 1000)
}