'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lock, ArrowLeft, AlertCircle } from 'lucide-react'
import { AuthMobileHeader } from './AuthMobileHeader'
import { PasswordInput } from './PasswordInput'
import { AuthSubmitButton } from './AuthSubmitButton'
import { validatePasswordResetForm } from '@/lib/auth/validation'

interface ResetPasswordFormProps {
  token: string
  email: string
  onSuccess: () => void
  onSubmit: (token: string, newPassword: string) => Promise<void>
}

export function ResetPasswordForm({ token, email, onSuccess, onSubmit }: ResetPasswordFormProps) {
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validation = validatePasswordResetForm(formData.newPassword, formData.confirmPassword)
    if (!validation.isValid) {
      setError(Object.values(validation.errors)[0])
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(token, formData.newPassword)
      onSuccess()
    } catch (err: any) {
      setError(err?.message || 'Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthMobileHeader />

      <h2 className="text-3xl font-bold text-must-blue font-display mb-2 text-center md:text-left">
        Set New Password
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
        Creating new password for <strong className="text-gray-800">{email}</strong>
      </p>

      {error && (
        <div role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <PasswordInput
          id="newPassword"
          name="newPassword"
          label="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter your new password"
          disabled={isLoading}
          autoComplete="new-password"
          hasError={!!(error && !formData.newPassword.trim())}
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your new password"
          disabled={isLoading}
          autoComplete="new-password"
          hasError={!!(error && !formData.confirmPassword.trim())}
        />

        <div className="mt-2">
          <AuthSubmitButton
            isLoading={isLoading}
            loadingText="Resetting Password..."
            icon={<Lock className="w-4 h-4" />}
          >
            Reset Password
          </AuthSubmitButton>
        </div>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </>
  )
}